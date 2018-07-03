# Feelings
Capstone Project for DataScience UB

- Notebook with code for Amerian tweets. Only the preprocessing step of the tweet is valid.
- Dataset with Spanish tweets

*The directory [DatasetAnalysis](./DatasetAnalysis) contains individual steps to analyse the data.
*Tweets for both training and submission can be found in [data](./data).
*The [model](./model) we used from keras in order to classify the tweets.

To read the Spanish tweets use
```python
df = pd.read_csv('tweets_public.csv', encoding='utf-16', index_col='tweet_id', sep=',')
```


