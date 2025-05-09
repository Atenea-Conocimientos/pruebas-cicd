pipeline {
  agent { label 'mac' }
  tools { nodejs 'node-lts' }
  environment { BASE_URL = credentials('BASE_URL') }
  options { timeout(time: 60, unit: 'MINUTES'); timestamps() }
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Install dependencies') { steps { sh 'npm ci' } }
    stage('Install Playwright Browsers') { steps { sh 'npx playwright install' } }
    stage('Run Playwright tests') { steps { sh 'npx playwright test --reporter=line,junit' } }
  }
  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
      junit allowEmptyResults: true, testResults: '**/test-results/**/*.xml'
    }
  }
}
