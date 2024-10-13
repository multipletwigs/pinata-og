CREATE TABLE og_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cid TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    og_image_path TEXT,
    site_name TEXT,
    author TEXT,
    user_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE og_content ENABLE ROW LEVEL SECURITY;

CREATE FUNCTION update_modified_column() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_og_content_modtime
BEFORE UPDATE ON og_content
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

CREATE POLICY insert_own_og_content ON og_content FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY view_own_og_content ON og_content FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY update_own_og_content ON og_content FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY delete_own_og_content ON og_content FOR DELETE
    USING (auth.uid() = user_id);
