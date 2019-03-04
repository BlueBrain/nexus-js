String version = env.BRANCH_NAME
String commitId = env.GIT_COMMIT
Boolean isRelease = version ==~ /v\d+\.\d+\.\d+.*/
Boolean isPR = env.CHANGE_ID != null

pipeline {
    agent any

    environment {
        NPM_NEXUS_TOKEN = credentials('npm-nexus-token')
    }

    stages {
        stage('Start Pipeline') {
            steps{
                sh 'echo "Pipeline starting with environment:"'
                sh 'printenv'
            }
        }

        stage('Checkout and Install dependencies') {
            steps {
                checkout scm
                sh 'npm ci'
            }
        }

        stage('Review') {
            parallel {
                stage('Lint') {
                    steps {
                        sh 'npm run lint -- -c tslint.prod.json'
                    }
                }
                stage('Test') {
                    steps {
                        sh 'npm run test'
                    }
                }
                stage('Build') {
                    steps {
                        sh 'npm run build'
                    }
                }
                stage('Coverage') {
                    steps {
                        sh "npm run codecov -- --token=\"`oc get secrets codecov-secret --template='{{.data.nexus_sdk_js}}' | base64 -d`\""
                    }
                }
            }
        }

        stage('Publish to npm') {
            when {
                expression { isRelease }
            }
            steps {
                sh 'echo "//registry.npmjs.org/:_authToken=${NPM_NEXUS_TOKEN}" > .npmrc && npm publish'
            }
        }
    }
}
