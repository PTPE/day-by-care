/* eslint-disable max-lines */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      client: {
        Row: {
          address: string;
          birthday: string;
          client_icon: string | null;
          client_id: string;
          client_name: string;
          created_at: string;
          emergency_contact: string;
          emergency_contact_phone: string;
          office_phone: string;
          service_item_ids: Database['public']['Enums']['service_item_id'][];
          supervisor_name: string;
          supervisor_phone: string;
          user_id: string;
        };
        Insert: {
          address: string;
          birthday: string;
          client_icon?: string | null;
          client_id?: string;
          client_name?: string;
          created_at?: string;
          emergency_contact?: string;
          emergency_contact_phone?: string;
          office_phone?: string;
          service_item_ids: Database['public']['Enums']['service_item_id'][];
          supervisor_name?: string;
          supervisor_phone?: string;
          user_id?: string;
        };
        Update: {
          address?: string;
          birthday?: string;
          client_icon?: string | null;
          client_id?: string;
          client_name?: string;
          created_at?: string;
          emergency_contact?: string;
          emergency_contact_phone?: string;
          office_phone?: string;
          service_item_ids?: Database['public']['Enums']['service_item_id'][];
          supervisor_name?: string;
          supervisor_phone?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'client_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      schedule: {
        Row: {
          client_id: string;
          created_at: string | null;
          month: number;
          schedule_id: string;
          year: number;
        };
        Insert: {
          client_id: string;
          created_at?: string | null;
          month: number;
          schedule_id?: string;
          year: number;
        };
        Update: {
          client_id?: string;
          created_at?: string | null;
          month?: number;
          schedule_id?: string;
          year?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'client_schedule_client_id_fkey';
            columns: ['client_id'];
            isOneToOne: false;
            referencedRelation: 'client';
            referencedColumns: ['client_id'];
          },
        ];
      };
      service_item: {
        Row: {
          service_id: Database['public']['Enums']['service_item_id'];
          service_name: string;
        };
        Insert: {
          service_id: Database['public']['Enums']['service_item_id'];
          service_name: string;
        };
        Update: {
          service_id?: Database['public']['Enums']['service_item_id'];
          service_name?: string;
        };
        Relationships: [];
      };
      time_slots: {
        Row: {
          created_at: string | null;
          end: string | null;
          schedule_id: string | null;
          start: string | null;
          time_slots_id: string;
        };
        Insert: {
          created_at?: string | null;
          end?: string | null;
          schedule_id?: string | null;
          start?: string | null;
          time_slots_id?: string;
        };
        Update: {
          created_at?: string | null;
          end?: string | null;
          schedule_id?: string | null;
          start?: string | null;
          time_slots_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'time_slots_schedule_id_fkey';
            columns: ['schedule_id'];
            isOneToOne: false;
            referencedRelation: 'schedule';
            referencedColumns: ['schedule_id'];
          },
        ];
      };
      user: {
        Row: {
          created_at: string;
          email: string | null;
          id: string;
          name: string | null;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id?: string;
          name?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: string;
          name?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      insert_or_update_schedule: {
        Args: {
          p_client_id: string;
          p_year: number;
          p_month: number;
          p_time_slots: Json;
        };
        Returns: undefined;
      };
    };
    Enums: {
      service_item_id:
        | 'BA01'
        | 'BA02'
        | 'BA03'
        | 'BA04'
        | 'BA05'
        | 'BA07'
        | 'BA10'
        | 'BA11'
        | 'BA12'
        | 'BA13'
        | 'BA14'
        | 'BA15-1'
        | 'BA15-2'
        | 'BA16-1'
        | 'BA16-2'
        | 'BA17'
        | 'BA18'
        | 'BA20'
        | 'BA22'
        | 'BA23'
        | 'BA24';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      service_item_id: [
        'BA01',
        'BA02',
        'BA03',
        'BA04',
        'BA05',
        'BA07',
        'BA10',
        'BA11',
        'BA12',
        'BA13',
        'BA14',
        'BA15-1',
        'BA15-2',
        'BA16-1',
        'BA16-2',
        'BA17',
        'BA18',
        'BA20',
        'BA22',
        'BA23',
        'BA24',
      ],
    },
  },
} as const;
