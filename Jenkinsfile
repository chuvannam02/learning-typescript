/* Requires the Docker Pipeline plugin */
pipeline {
    agent any
    stages {
        stage('checkout') {
            steps {
                sh 'echo "Checkout main branch"'
            }
        }
        
        stage('build') {
            steps {
                sh 'node --version'
            }
        }
    }
}
