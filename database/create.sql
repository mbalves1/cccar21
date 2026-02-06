drop schema if exists cccar cascade;

create schema cccar;

create table cccar.account (
  account_id uuid primary key,
  name text,
  email text,
  document text,
  password text
);