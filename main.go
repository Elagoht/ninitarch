package main

import (
	"embed"
	"encoding/json"
	"io/fs"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

//go:embed static/*
var staticFiles embed.FS

//go:embed data/*.json
var dataFiles embed.FS

type Server struct {
	mux *http.ServeMux
}

func NewServer() *Server {
	s := &Server{
		mux: http.NewServeMux(),
	}
	s.routes()
	return s
}

func (s *Server) routes() {
	// Serve embedded static files
	staticFS, err := fs.Sub(staticFiles, "static")
	if err != nil {
		log.Fatal(err)
	}
	s.mux.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.FS(staticFS))))

	// Serve public assets (icons, favicons)
	publicFS := http.Dir("public")
	s.mux.Handle("/public/", http.StripPrefix("/public/", http.FileServer(publicFS)))

	// API endpoints for data
	s.mux.HandleFunc("/api/data", s.handleGetAllData)

	// Root route
	s.mux.HandleFunc("/", s.handleIndex)
}

func (s *Server) handleIndex(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}

	indexPath := filepath.Join("static", "index.html")
	data, err := staticFiles.ReadFile(indexPath)
	if err != nil {
		http.Error(w, "Could not read index.html", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Write(data)
}

func (s *Server) handleGetAllData(w http.ResponseWriter, r *http.Request) {
	categories := []string{"Essentials", "Development", "Terminal", "Gaming", "Games"}
	result := make(map[string]json.RawMessage)

	for _, category := range categories {
		dataPath := filepath.Join("data", category+".json")
		data, err := dataFiles.ReadFile(dataPath)
		if err != nil {
			log.Printf("Error reading %s: %v", category, err)
			continue
		}

		result[category] = json.RawMessage(data)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func (s *Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	s.mux.ServeHTTP(w, r)
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	server := NewServer()
	log.Printf("Server starting on http://localhost:%s", port)

	if err := http.ListenAndServe(":"+port, server); err != nil {
		log.Fatal(err)
	}
}
