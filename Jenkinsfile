pipeline {
    agent any

    environment {
        IMAGE_NAME = "my-react-app"
        CONTAINER_NAME = "react-app-container"
        APP_PORT = "8000"
        NGINX_PORT = "80"
    }

    stages {
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
                    sh """
                        echo "🧹 Cleaning old containers..."
        
                        # Remove test container
                        docker rm -f ${CONTAINER_NAME}-test || true
        
                        # Remove prod container if it uses the same port
                        CONTAINER_ID=\$(docker ps -q --filter "publish=${APP_PORT}")
                        if [ ! -z "\$CONTAINER_ID" ]; then
                            echo "🛑 Removing container \$CONTAINER_ID using port ${APP_PORT}..."
                            docker rm -f \$CONTAINER_ID
                        fi
        
                        echo "🚀 Running test container..."
                        docker run -d --name ${CONTAINER_NAME}-test -p ${APP_PORT}:${NGINX_PORT} ${IMAGE_NAME}:latest
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
