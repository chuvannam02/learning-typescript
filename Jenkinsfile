/* Requires the Docker Pipeline plugin */
pipeline {
    agent { docker { image 'node:24.11.0-alpine3.22' } }
    stages {
        stage('build') {
            steps {
                sh 'node --version'
            }
        }
    }
}
