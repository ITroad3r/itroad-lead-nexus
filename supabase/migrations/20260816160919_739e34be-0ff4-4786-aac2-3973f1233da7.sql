CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT INSERT ON public.leads TO anon;
GRANT INSERT, SELECT ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a lead" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (
  char_length(full_name) BETWEEN 1 AND 100
  AND char_length(email) BETWEEN 3 AND 255
  AND char_length(phone) BETWEEN 5 AND 40
  AND char_length(company) BETWEEN 1 AND 150
  AND (message IS NULL OR char_length(message) <= 2000)
);