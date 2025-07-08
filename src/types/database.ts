
export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'exp_staff' | 'team_lead' | 'agent';
  created_at: string;
  updated_at: string;
}

export interface Agent {
  id: string;
  user_id: string;
  exp_cap_type: '16k' | '8k' | '4k';
  exp_cap_amount: number;
  exp_cap_paid: number;
  team_lead_id: string;
  exp_staff_id: string;
  is_active: boolean;
  created_at: string;
  user?: User;
  team_lead?: User;
  exp_staff?: User;
}

export interface Team {
  id: string;
  team_lead_id: string;
  exp_staff_id: string;
  team_name: string;
  external_cap_amount: number | null;
  external_cap_description: string;
  created_at: string;
  team_lead?: User;
  exp_staff?: User;
}

export interface TeamAgent {
  id: string;
  team_id: string;
  agent_id: string;
  external_cap_paid: number;
  split_percentage: number;
  team_lead_percentage: number;
  created_at: string;
  team?: Team;
  agent?: Agent;
}

export interface Transaction {
  id: string;
  agent_id: string;
  gross_commission: number;
  exp_company_split: number;
  team_external_cap_split: number;
  team_lead_general_split: number;
  agent_net_amount: number;
  transaction_date: string;
  property_address: string;
  created_by: string;
  created_at: string;
  agent?: Agent;
  created_by_user?: User;
}
