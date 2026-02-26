# Agent Setup Guide

This document is intended for future AI agents or developers who need to set up the local development environment for this Jekyll site.

## Prerequisites

1.  **Ruby**: Version 3.3 or later.
    *   **Installation (macOS via Homebrew):**
        ```bash
        brew install ruby
        ```
    *   **Path Configuration:** Ensure the Homebrew Ruby binary is in your PATH.
        ```bash
        export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
        ```

2.  **Bundler**: Ruby dependency manager.
    *   **Installation:**
        ```bash
        gem install bundler
        ```

## Installation

1.  **Install Dependencies:**
    Run this command in the project root to install all required gems specified in the `Gemfile`:
    ```bash
    bundle install
    ```

## Running the Server

To start the local Jekyll server with live reloading enabled:

```bash
export PATH="/opt/homebrew/opt/ruby/bin:$PATH" && bundle exec jekyll serve --livereload
```

*   **`bundle exec`**: Ensures you use the gem versions defined in `Gemfile.lock`.
*   **`--livereload`**: Automatically refreshes the browser on file changes.
*   **Access**: The site will be available at `http://127.0.0.1:4000/`.

## Important Notes

*   **Do NOT** use the system default Ruby on macOS; it is outdated. Always use the Homebrew version.
*   The `.github/workflows/jekyll.yml` file is the source of truth for the production Ruby version (currently 3.3).

## Offline / Vendor Setup (Recommended)

If you encounter network or SSL issues when installing gems, you can use the pre-installed gems in the `vendor/bundle` directory.

> **CRITICAL DISTINCTION:**
> *   **Ruby Interpreter**: You **MUST** install this yourself (e.g., `brew install ruby`). The vendor directory does **NOT** contain the Ruby engine.
> *   **Gems (Dependencies)**: These **ARE** included in `vendor/bundle` (specifically for Ruby 3.4). You do **NOT** need to download them.

1.  **Install Ruby Interpreter:**
    Ensure you have a Ruby 3.4+ interpreter installed (e.g., via Homebrew) and in your PATH.
    ```bash
    brew install ruby
    export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
    ```

2.  **Configure Bundler to use local vendor path:**
    ```bash
    bundle config set --local path 'vendor/bundle'
    ```

    *Note:* Pre-installed gems compatible with Ruby 3.4 are available at `vendor/bundle/ruby/3.4.0`.

3.  **Install (Local Only):**
    ```bash
    bundle install --local
    ```

4.  **Run Server:**
    ```bash
    bundle exec jekyll serve --livereload
    ```
