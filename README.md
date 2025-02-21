## やること

## Implement

- Bookmark Edit, Complete, Delete
- Fix bookmark links
- Story/Chapter metadata
- Update story words and total chapters
- Custom user themes
- User preferences

### /ROOT

- Added reading, writing, creating tabs
  - Read:
    - Display account bookmarks
      - Check complete, edit, delete
  - Write:
    - Display account stories by author
  - Create:
    - Create new story
    - Create new chapter
    - Create new author

#### Sidebars

- Left:
- Right:

### /author/add

- Added function to create author and profile
  - Supabase function : Author is created, then profile is created with the same uuid and Author relation is added to the profile

### /story/add

- Create story

### /story/[id]

- Get story by id
- Add bookmark

## Database Structure

- Author
  - id
  - -> user (uuid)
  - username
  - created_at
- Profiles
  - id
  - -> Authors (uuid)
  - about
  - user_id
  - created_at
- Stories
  - id (int8)
  - user_id (user.id)
  - -> Authors (uuid)
  - title
  - summary
  - views
  - total_words
  - chapter_count
  - created_at
- Chapters
  - id (uuid)
  - user_id (user.uuid)
  - -> Story (uuid)
  - title
  - content
  - chapterindex
  - word_count
  - created_at
- Bookmarks
  - id (uuid)
  - author_id (author.uuid)
  - -> Story (uuid)
  - -> Chapter (uuid)
  - note
  - created_at
- Likes
  - id (uuid)
  - author_id (author.uuid)
  - -> Story (uuid)
  - created_at
- Recommendations
  - id (uuid)
  - author_id (author.uuid)
  - -> Story (uuid)
  - created_at
