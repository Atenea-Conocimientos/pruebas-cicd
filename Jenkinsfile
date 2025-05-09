pipeline {
  agent any

  environment {
    BASE_URL = credentials('BASE_URL')
  }

  options {
    timeout(time: 60, unit: 'MINUTES')
    timestamps()
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Install deps') {
      steps { sh 'npm ci' }
    }

    stage('Install browsers') {
      steps { sh 'npx playwright install' }
    }

    stage('Run tests') {
      steps {
        // genera: playwright-report/  +  test-results/*.xml
        sh 'npx playwright test --reporter=html,line,junit'
      }
    }
  }

  post {
    always {
      /* ── Artefacto ZIP del reporte ─────────────────────── */
      archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true

      /* ── Publicación del reporte HTML embebido ─────────── */
      publishHTML([
        allowMissing: false,
        alwaysLinkToLastBuild: true,
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Playwright Report'
      ])

      /* ── Resultados JUnit para la vista "Tests" ────────── */
      junit allowEmptyResults: true,
            testResults: 'test-results/*.xml'
    }
  }
}
