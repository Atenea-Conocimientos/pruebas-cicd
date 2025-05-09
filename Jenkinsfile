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
    stage('Checkout')          { steps { checkout scm } }
    stage('Install deps')      { steps { sh 'npm ci' } }
    stage('Install browsers')  { steps { sh 'npx playwright install' } }
    stage('Run tests') {
      steps {
        sh 'npx playwright test --reporter=html,line,junit'
      }
    }
  }
  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
      junit allowEmptyResults: true, testResults: '**/test-results/**/*.xml'
    }
  }
}
