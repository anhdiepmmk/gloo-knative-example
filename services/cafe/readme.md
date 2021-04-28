# Install nginx ingress from nginxinc (https://github.com/nginxinc/kubernetes-ingress/)
```
helm install my nginx-stable/nginx-ingress
```

# Test cafe.example.com via curl
```
curl --resolve cafe.example.com:$IC_HTTPS_PORT:$IC_IP https://cafe.example.com:$IC_HTTPS_PORT/coffee --insecure
curl --resolve cafe.example.com:$IC_HTTPS_PORT:$IC_IP https://cafe.example.com:$IC_HTTPS_PORT/tea --insecure
```