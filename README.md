

# heli-toon / innovenvirosh

A containerized landscaping website project.

---

## 📦 Requirements
Before running the project, install these on your Windows machine:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Docker Compose (comes automatically with Docker Desktop)

✅ After installing Docker, make sure it's **running** in the background.

---

## 🚀 How to Run the Project (Port 1234)

Follow these simple steps:

### 1. Clone the Repository

```bash
git clone https://github.com/heli-toon/innovenvirosh.git
cd innovenvirosh
```

### 2. Build and Start the Containers

```bash
docker compose up --build
```

This will:
- Install all necessary dependencies inside the container.
- Build the frontend.
- Serve the project automatically on **port 1234**.

---

## 🌍 Access the Website

After everything runs successfully, open your browser and visit:

```
http://localhost:1234
```

You should see the **Innovenvirosh** website live!

---

## 📜 Notes

- **First time run** might take a few minutes because it installs dependencies and builds the project.
- Any changes you make to the code will require you to rebuild (`docker compose up --build`) to reflect updates.

---

## ✍️ Author

- Prince Panfoh

---



