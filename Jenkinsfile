pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/your-repo/todolist.git'
            }
        }
        stage('Build') {
            steps {
                sh 'mvn clean package'
            }
        }
        stage('Code Quality') {
            steps {
                sh 'sonar-scanner -Dsonar.projectKey=todolist -Dsonar.sources=src -Dsonar.host.url=http://your-sonarqube-server'
            }
        }
        stage('Dependency Check') {
            steps {
                sh 'dependency-check --project todolist --out ./dependency-check-report'
            }
        }
        stage('Docker Build') {
            steps {
                sh 'docker build -t your-dockerhub-username/todolist .'
            }
        }
        stage('Docker Push') {
            steps {
                sh 'docker push your-dockerhub-username/todolist'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker run -d -p 8080:8080 your-dockerhub-username/todolist'
            }
        }
    }
}
