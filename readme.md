> Start minikube
```
minikube start --profile insane
```
> Install Homebrew
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
> Installing on Kubernetes with glooctl 
```
glooctl install gateway
```
> Installing on Kubernetes with Helm 
```
NAMESPACE=gloo-system

helm repo add gloo https://storage.googleapis.com/solo-public-helm
helm repo update
kubectl create namespace $NAMESPACE

helm install gloo gloo/gloo --namespace $NAMESPACE
```

> Verify your Installation 
```
kubectl get all -n safemoon

```

> Uninstall gloo using glooctl
```
glooctl uninstall -n gloo-system
glooctl uninstall --all
glooctl uninstall
```