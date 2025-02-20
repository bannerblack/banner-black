export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Authors: {
        Row: {
          created_at: string
          id: string
          user: string
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          user?: string
          username?: string
        }
        Update: {
          created_at?: string
          id?: string
          user?: string
          username?: string
        }
        Relationships: []
      }
      bookmarks: {
        Row: {
          Author: string | null
          Chapter: string | null
          created_at: string
          id: string
          note: string | null
          user_id: string | null
        }
        Insert: {
          Author?: string | null
          Chapter?: string | null
          created_at?: string
          id?: string
          note?: string | null
          user_id?: string | null
        }
        Update: {
          Author?: string | null
          Chapter?: string | null
          created_at?: string
          id?: string
          note?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_Author_fkey"
            columns: ["Author"]
            isOneToOne: false
            referencedRelation: "Authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmarks_Chapter_fkey"
            columns: ["Chapter"]
            isOneToOne: false
            referencedRelation: "Chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      Chapters: {
        Row: {
          chapter_index: number
          content: string
          created_at: string
          id: string
          Story: number
          title: string
          user_id: string
          word_count: number | null
        }
        Insert: {
          chapter_index?: number
          content?: string
          created_at?: string
          id?: string
          Story: number
          title?: string
          user_id?: string
          word_count?: number | null
        }
        Update: {
          chapter_index?: number
          content?: string
          created_at?: string
          id?: string
          Story?: number
          title?: string
          user_id?: string
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Chapters_Story_fkey"
            columns: ["Story"]
            isOneToOne: false
            referencedRelation: "Stories"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          Author: string | null
          Chapter: string | null
          created_at: string
          hidden: boolean | null
          id: string
          user_id: string | null
        }
        Insert: {
          Author?: string | null
          Chapter?: string | null
          created_at?: string
          hidden?: boolean | null
          id?: string
          user_id?: string | null
        }
        Update: {
          Author?: string | null
          Chapter?: string | null
          created_at?: string
          hidden?: boolean | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_Author_fkey"
            columns: ["Author"]
            isOneToOne: false
            referencedRelation: "Authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_Chapter_fkey"
            columns: ["Chapter"]
            isOneToOne: false
            referencedRelation: "Chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          Author: string | null
          created_at: string
          id: string
          Story: number | null
          user_id: string | null
        }
        Insert: {
          Author?: string | null
          created_at?: string
          id?: string
          Story?: number | null
          user_id?: string | null
        }
        Update: {
          Author?: string | null
          created_at?: string
          id?: string
          Story?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "likes_Author_fkey"
            columns: ["Author"]
            isOneToOne: false
            referencedRelation: "Authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_Story_fkey"
            columns: ["Story"]
            isOneToOne: false
            referencedRelation: "Stories"
            referencedColumns: ["id"]
          },
        ]
      }
      Profiles: {
        Row: {
          about: string | null
          Author: string | null
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          about?: string | null
          Author?: string | null
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          about?: string | null
          Author?: string | null
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Profiles_Author_fkey"
            columns: ["Author"]
            isOneToOne: false
            referencedRelation: "Authors"
            referencedColumns: ["id"]
          },
        ]
      }
      reccommendations: {
        Row: {
          Author: string | null
          comment: string | null
          created_at: string
          id: string
          Story: number | null
          user_id: string | null
        }
        Insert: {
          Author?: string | null
          comment?: string | null
          created_at?: string
          id?: string
          Story?: number | null
          user_id?: string | null
        }
        Update: {
          Author?: string | null
          comment?: string | null
          created_at?: string
          id?: string
          Story?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reccommendations_Author_fkey"
            columns: ["Author"]
            isOneToOne: false
            referencedRelation: "Authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reccommendations_Story_fkey"
            columns: ["Story"]
            isOneToOne: false
            referencedRelation: "Stories"
            referencedColumns: ["id"]
          },
        ]
      }
      Stories: {
        Row: {
          Author: string
          chapter_count: number | null
          created_at: string
          id: number
          summary: string
          title: string
          total_words: number | null
          user_id: string
          views: number | null
        }
        Insert: {
          Author: string
          chapter_count?: number | null
          created_at?: string
          id?: number
          summary?: string
          title: string
          total_words?: number | null
          user_id?: string
          views?: number | null
        }
        Update: {
          Author?: string
          chapter_count?: number | null
          created_at?: string
          id?: number
          summary?: string
          title?: string
          total_words?: number | null
          user_id?: string
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Stories_Author_fkey"
            columns: ["Author"]
            isOneToOne: false
            referencedRelation: "Authors"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_author_and_profile: {
        Args: {
          p_user: string
          p_username: string
          p_about: string
        }
        Returns: string
      }
      create_author_and_profile2: {
        Args: {
          p_user: string
          p_username: string
        }
        Returns: string
      }
      get_adjacent_chapters: {
        Args: {
          story_id: number
          current_index: number
        }
        Returns: {
          prev_id: string
          next_id: string
        }[]
      }
      increment: {
        Args: {
          story_id: number
        }
        Returns: undefined
      }
      increment_views: {
        Args: {
          story_id: number
        }
        Returns: undefined
      }
    }
    Enums: {
      pairings:
        | "Uchiha Sasuke x Uzumaki Naruto"
        | "Bakugou Katsuki x Midoriya Izuku"
        | "Min Yoongi x Park Jimin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
