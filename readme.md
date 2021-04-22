## Start minikube
```
minikube start --profile insane
```
## Install Homebrew and glooctl
> Install brew
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# for fish user
sudo nano  ~/.config/fish/config.fish
# put this line to end of file
eval (/home/linuxbrew/.linuxbrew/bin/brew shellenv)

# for bash user
nano ~/.profile
# put this line to end of file
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
```
> Install glooctl via brew
```
brew install glooctl
```

## Installing on Kubernetes with glooctl 
```
glooctl install gateway
```

## Installing on Kubernetes with Helm 
```
NAMESPACE=gloo-system

helm repo add gloo https://storage.googleapis.com/solo-public-helm
helm repo update
kubectl create namespace $NAMESPACE

helm install gloo gloo/gloo --namespace $NAMESPACE
```

## Verify your Installation 
```
kubectl get all -n safemoon

```

## Uninstall gloo using glooctl
```
glooctl uninstall -n gloo-system
glooctl uninstall --all
glooctl uninstall
```

## Add a Routing Rule
```
glooctl add route \
            --path-exact /posts/api/v1/posts \
            --dest-name safemoon-posts-8080 \
            --prefix-rewrite /api/v1/posts

glooctl add route \
            --path-exact /users/api/v1/users \
            --dest-name safemoon-users-8081 \
            --prefix-rewrite /api/v1/users
```

## VirtualService
```
glooctl get virtualservice
glooctl delete virtualservice default
```

# Test the Route Rule 
```
curl $(glooctl proxy url)/posts/api/v1/posts
curl $(glooctl proxy url)/users/api/v1/users
```

# Metallb
```
Installation By minikube
minikube addons enable metallb
minikube addons configure metallb --profile insane

# Installation By Manifest
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.9.6/manifests/namespace.yaml
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.9.6/manifests/metallb.yaml
# On first install only
kubectl create secret generic -n metallb-system memberlist --from-literal=secretkey="$(openssl rand -base64 128)"

# test metallb
kubectl create deployment nginx --image=nginx
kubectl expose deploy nginx --port 80 --type LoadBalancer
```

# Get gateway ip
```
kubectl get svc --namespace gloo-system gateway-proxy --output=jsonpath="{.status.loadBalancer.ingress[0].ip}"
```