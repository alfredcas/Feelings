import datetime
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
from sklearn.naive_bayes import BernoulliNB
from sklearn.linear_model import SGDClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score


import pandas as pd
import numpy as np


def create_submit_file(df_submission, ypred):
    date = datetime.datetime.now().strftime("%m_%d_%Y-%H_%M_%S")
    filename = 'submission_' + date + '.csv'

    df_submission['airline_sentiment'] = ypred
    df_submission[['airline_sentiment']].to_csv(filename)

    print('Submission file created: {}'.format(filename))
    print('Upload it to Kaggle InClass')


df = pd.read_csv('../tweets_public.csv', index_col='tweet_id')
train, test = train_test_split(df, test_size=0.25)

df.airline_sentiment = pd.Categorical(df.airline_sentiment)

categories = pd.Categorical(df.airline_sentiment).categories

y_train = train['airline_sentiment'].values

train_tweets = train['text']
test_tweets = test['text']

text_clf = Pipeline([('vect', CountVectorizer(min_df=1, stop_words='english', analyzer='word')),
                     ('tfidf', TfidfTransformer()),
                     ('clf', SGDClassifier(penalty='l2'))])

# SGDClassifier(loss='hinge', penalty='l2', alpha=1e-3, random_state=42, max_iter=5, tol=None))])

text_clf.fit(train_tweets, y_train)

df_submission = pd.read_csv('../tweets_submission.csv', index_col='tweet_id')

predicted = text_clf.predict(test.text)
print('mean accuracy = ', np.mean(predicted == test.airline_sentiment))
print('accuracy_score = ', accuracy_score(test.airline_sentiment, predicted))
