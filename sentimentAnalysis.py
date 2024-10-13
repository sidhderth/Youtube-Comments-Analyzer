from transformers import pipeline

classifier = pipeline("sentiment-analysis")

text = #list of comments
result = classifier(text)

label = [item['label'] for item in result] #list of sentiment values