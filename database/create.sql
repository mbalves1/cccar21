drop schema if exists cccar cascade;

create schema cccar;

create table cccar.account (
  account_id uuid primary key,
  name text,
  email text,
  document text,
  password text
);

create table cccar.account_asset (
  account_id uuid,
  asset_id text,
  quantity numeric,
  primary key (account_id, asset_id)
);