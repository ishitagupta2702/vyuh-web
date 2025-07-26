FROM docker.ci.artifacts.walmart.com/hub-docker-release-remote/library/python:3.12-slim AS builder

COPY --from=docker.ci.artifacts.walmart.com/ghcr-docker-release-remote/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

ENV UV_COMPILE_BYTECODE=1
ENV UV_LINK_MODE=copy
ENV UV_CACHE_DIR=/app/.cache/uv

COPY . /app/

RUN uv lock && uv sync --frozen --no-dev --no-editable

# Remove unnecessary files from the virtual environment before copying
RUN find /app/.venv -name '__pycache__' -type d -exec rm -rf {} + && \
    find /app/.venv -name '*.pyc' -delete && \
    find /app/.venv -name '*.pyo' -delete && \
    echo "Cleaned up .venv"

FROM docker.ci.artifacts.walmart.com/hub-docker-release-remote/library/python:3.12-slim

COPY --from=docker.ci.artifacts.walmart.com/wce-docker/ca-roots:latest /usr/local/share/ca-certificates /usr/local/share/ca-certificates
COPY --from=docker.ci.artifacts.walmart.com/wce-docker/ca-roots:latest /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt

RUN rm -f /etc/ssl/cert.pem && ln -s /etc/ssl/certs/ca-certificates.crt /etc/ssl/cert.pem

# Create user and necessary directories with proper permissions
RUN groupadd -g 10001 addgroup && \
    useradd -u 10000 -g addgroup -d /app -s /bin/bash app && \
    mkdir -p /app/.local && \
    chown -R app:addgroup /app

EXPOSE 8080

ENV SSL_CERT_FILE /etc/ssl/cert.pem
ENV REQUESTS_CA_BUNDLE /etc/ssl/cert.pem

ENV OTEL_SDK_DISABLED=true
ENV MODEL=ollama/llama3.2
ENV API_BASE=http://localhost:11434

USER 10000

COPY --chown=app:addgroup --from=builder /app/.venv /app/.venv

ENTRYPOINT ["/app/.venv/bin/identityCrew"]
CMD ["--host", "0.0.0.0", "--port", "8080"]
