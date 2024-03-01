terraform {
  cloud {
    organization = "karthikrajansvg"

    workspaces {
      project = "maaroos-inc"
      name = "maaroos-web"
    }
  }
}

provider "google" {
  project     = "inspired-memory-398714"
  region      = "asia-south1"
  credentials = file("GCP/cred.json")
}

resource "google_storage_bucket" "website_bucket" {
  name          = "my-first-maaroos-web"
  location      = "asia-south1"
  uniform_bucket_level_access = true
  website {
    main_page_suffix = "index.html"
    not_found_page   = "index.html"
  }

#   lifecycle {
#     ignore_changes = [
      
#     ]
#   }
}

resource "google_storage_bucket_object" "website_files" {
  for_each = fileset("build", "**/*")

  name   = "${each.value}"
  source = "build/${each.value}"
  bucket = google_storage_bucket.website_bucket.name
}

resource "google_storage_bucket_iam_binding" "public_read" {
  bucket = google_storage_bucket.website_bucket.name
  role   = "roles/storage.objectViewer"
  members = [
    "allUsers",
  ]
}