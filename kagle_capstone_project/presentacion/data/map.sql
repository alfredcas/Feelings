drop table wrd_tt;
create table wrd_tt as
with t1 as
(
select
(case
when (a.lat is not null and a.lon is not null) then st_setsrid(st_makepoint(a.lon,a.lat),4326)
when (a.tt_lat is not null and a.tt_lng is not null) then st_setsrid(st_makepoint(a.tt_lng,a.tt_lat),4326)
when (a.usr_lat is not null and a.usr_lng is not null) then st_setsrid(st_makepoint(a.usr_lng,a.usr_lat),4326)
else Null
end)::geometry (POINT,4326) as geom,
a.tweet_id,
b.users as airlines,
a.airline_sentiment as sentiment,
a.date
from tweets_public_clean a
left join tweets_public_with_airlines b on a.tweet_id = b.tweet_id
)

select
st_x(st_centroid(a.geom)) as lon,
st_y(st_centroid(a.geom)) as lat,
a.name as country,
count(distinct t1.tweet_id) as general,
sum(case when t1.sentiment = 'negative' then 1 else 0 end) as negative,
sum(case when t1.sentiment = 'positive' then 1 else 0 end) as positive,
sum(case when t1.sentiment = 'neutral' then 1 else 0 end) as neutral,
t1.date
from ne_10m_admin_0_countries a
left join t1 on st_intersects(a.geom, t1.geom)
where t1.geom is not Null
group by a.geom, a.name, t1.date;

alter table wrd_tt add column pk bigserial primary key;

