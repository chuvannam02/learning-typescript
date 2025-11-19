pipeline {
    agent any

    environment {
        IMAGE_NAME = "my-react-app"
        CONTAINER_NAME = "react-app-container"
        APP_PORT = "8000"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh """
                        echo "🛠 Building Docker image..."
                        docker build -t ${IMAGE_NAME}:latest .
                    """
                }
            }
        }

        stage('Run Test Container') {
            steps {
                script {
                    // Stop & remove old test container if exists
                    sh """
                        echo "🧹 Cleaning old test container..."
                        docker rm -f ${CONTAINER_NAME}-test || true
                    """

                    // Run test container
                    sh """
                        echo "🚀 Running test container..."
                        docker run -d --name ${CONTAINER_NAME}-test -p ${APP_PORT}:${APP_PORT} ${IMAGE_NAME}:latest
                    """

                    // Wait until port is ready
                    sh """
                        echo "⏳ Checking if service is up on port ${APP_PORT}..."
                        for i in {1..30}; do
                            if nc -z localhost ${APP_PORT}; then
                                echo "✅ Service is ready!"
                                exit 0
                            fi
                            echo "Waiting... (\$i)"
                            sleep 1
                        done
                        
                        echo "❌ Service did not start."
                        exit 1
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Stop old container
                    sh """
                        echo "🛑 Stopping old container..."
                        docker rm -f ${CONTAINER_NAME} || true
                    """

                    // Rename test container to production container
                    sh """
                        echo "🚚 Deploying new container..."
                        docker rename ${CONTAINER_NAME}-test ${CONTAINER_NAME}
                    """

                    sh """
                        echo "🎉 New version deployed successfully!"
                    """
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline finished."
        }
    }
}
