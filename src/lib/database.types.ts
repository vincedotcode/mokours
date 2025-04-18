export type Json = string | number | boolean | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          role: 'student' | 'admin'
          created_at: string
          updated_at: string
        };
        Insert: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          role: 'student' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          first_name?: string;
          last_name?: string;
          email?: string;
          role?: 'student' | 'admin';
          updated_at?: string;
        };
      };

      courses: {
        Row: {
          id: string                
          title: string
          description: string       
          price_rs: number         
          status: "draft" | "published"
          thumbnail_url: string
          category: string | null
          content: string | null
          published: boolean        
          created_by: string       
          created_at: string        
          updated_at: string       
        }

        Insert: {
          id?: string              
          title: string
          description: string
          price_rs: number
          category?: string | null
          content?: string | null
          status?: "draft" | "published"
          thumbnail_url: string
          published?: boolean
          created_by: string
          created_at?: string
          updated_at?: string
        }

        Update: {
          title?: string
          description?: string
          price_rs?: number
          status?: "draft" | "published"
          thumbnail_url?: string
          published?: boolean
          updated_at?: string
          category?: string | null
          content?: string | null
        }
      }

    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
