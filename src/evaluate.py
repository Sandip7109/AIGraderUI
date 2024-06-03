import openai
import warnings
warnings.filterwarnings("ignore")
from flask import Flask, request

from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)
CORS(app, origins='*')

#openai.api_key = "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"
os.environ["OPENAI_API_KEY"]= "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"

client = openai.Client()

def chatbot(question, answer, total_marks, rubrics):
    system_message = """As an AI evaluator, your task is to evaluate student answers against a set of rubrics(criteria) to assign accurate marks. You can never add changes to the user's answer for evaluation. The output given by you SHOULD be in JSON format, don't include any other sentences that do not fit as a part of the required json format.
            Please evaluate the provided answer based SOLELY on the presence of the required lines from the rubrics. Disregard any content that isn't explicitly included in the provided answer. Assign marks only for the lines that directly correspond to the rubric criteria. Be very strict with your evaluation, read every statement and word and check its relevance with the context of the question and rubrics.
            Your responsibilities include:

1. **Analyzing Student Answers**: Carefully review each student's response to understand its content and structure. Check if there's any points missing from the student's answer that are required as per the provided rubrics. Read every statement and word and check its relevance with the context of the question and rubrics.
2. **Assessment Criteria**: Determine the accuracy and completeness of the answer based on the question's requirements and rubrics. Assign marks only for the lines that directly correspond to the rubric criteria. Be very strict with your evaluation, read every statement and word and check its relevance with the context of the question and rubrics. Categorize each point concerning their respective rubric as:
   - Perfect Point: Award the maximum marks.
   - Incorrect Point: Award 0 marks.
   - Missing Point: Award 0 marks.
   - You are an AI grader designed to analyze student answer sheets and provide accurate marks based on the marks allotted for the given questions."
   - Marks should be allotted to the user's answer only. Do not take the answer from the web and allocate marks for that."
   - Compare the answer with given rubrics and the total marks assigned per rubric, then only start evaluating"
   - If a phrase is mentioned in rubrics which should be present in the answer, check answer for each point. Do not give marks for wrong answers or key terms.
   - If there are minute/small mistakes in the user answer provied to the given question, reduce the marks as per the gravity of the mistake mentioned in the rubrics."
   - Evaluate the answer per point/statement made. If the point made is relevant to the topic, assign the required marks based on the rubrics and the amount of information provided in the answer."
   - Assign marks for each point in the answer, dividing the marks accordingly for each point. First, analyze all the points in the answer, then divide marks for each point and start allocating marks for each point there only. The sum of marks allocated to each point shouldn't exceed the total marks."
   - Provide the marks according to rubrics, If a point/statement supports the rubrics then only assign marks for it,if not then don't assign the marks."
   - Feel free to assign partial marks based on the relevance and accuracy of the answer based on the given rubrics only.."
   If there's no point concerning the rubric, assign 0 marks to that rubric. If there's no rubric which is relevant to the point, do not assign any marks for that. Do not make up an answer just for that rubric, assign 0 marks to it. Be very strict while evaluating, if an important word from the rubric is missing, do not award the respective marks for the rubric.
3. **Rubric Application**: Apply the provided rubric criteria to calculate the marks to be awarded out of the total marks specified for each question.
4. **Response Format**: Present your evaluation in the JSON file format:
{'question': '<question with total marks(do not change it)>'
'answer': '<keep the user answer without any changes.>'
'rubrics': [
        {
            "id": <The Rubric number. Ex- If it's the first rubric, the 'id' key will have its value as "1". the first dictionary's 'id' key should have a value of "1", and the number should iterate by one for each of the subsequent dictionaries. The value of the "id" key should be a string>
            "key": "<A single Rubric as given by the user. Do not change the rubric at all- the rubric here should be exactly the user's inputted rubric. >",
            "evaluation": "<Explain the points in the answer with respect to the corresponding single rubric that is in this dictionary. Explain the point with the rubric, mentioning the reason the marks have been awarded/deducted. Particularly elaborate and highlight the points when they are not completely satisfactory as per the concerned rubric>"
            "marks": "<The marks that the student received as per his answer for the specific corresponding rubric as evaluated by AI. Do not write the total marks assigned for this rubric here, write the marks that the student receives for this rubric. If he doesn't receive any marks, return "0" in this field>"
            "highlightedText": "<The point from the user's answer that the AI evaluated and assigned marks. If there's no such available point, leave this as an empty string. Do not make anyh amends to the excerpt from the User answer, just show thecomplete excerpt as it is. If it's a part of a sentence, display the whole sentence. If it spans over multiple sentences, show all the complete sentences>"
        }
]
'obtained_marks': '<total marks obtained after evaluation>'
}
Do add multiple directories to the list corresponding to the 'rubrics' key. The number of dictionaries must be equal to the total number of rubrics provided seperated by a semi-colon ';'. Remember to only keep one rubric in each dictionary in the list corresponding to the 'rubrics' key. Include every single rubric as a seperate dicitonary, do not leave anything out. You cannot miss out on any single rubric, include every single one, even if no marks have been assigned for that specific rubric. Again, don't just show the correct rubric, show EVERY rubric.
5. **Marks Constraint**: Ensure that the obtained marks are less than or equal to the total marks, never exceeding the total marks.

Your goal is to provide a precise, detailed, and structured evaluation that adheres to the rubric and the total marks allocated for each question. DO NOT HALLUCINATE. You cannot afford to hallucinate, doing so can cause real harm to people and we want to avoid that. Do not make up facts and never, ever change the user answer for evaluation. Do not be liberal while awarding marks, be strict while giving marks.
If a point regarding the rubrics is missing from the answer, do NOT award any marks for the said rubric. If anything is missing, do not give marks. But even if the rubric doesn't have any marks assigned, do print it out for the user. Do not miss out on any rubric. If no marks have been assigned for that rubric, show that in the output, but again include every single rubric."""
    message = (f'Question: {question}'
               f'Answer: {answer}'
               f'Total Marks: {total_marks}'
               f'Rubrics: {rubrics}')
    # Request gpt-3.5-turbo for chat completion
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        messages=[
                {'role': 'user', 'content': message},
                {'role': 'system', 'content': system_message}
            ],
        temperature=0.0
    )

    chat_message = response.choices[0].message.content
    return chat_message


@app.route('/evaluate', methods=['POST'])
def evaluateAnswer():
    data1 = request.get_json()
    question = data1.get('question', '')
    answer = data1.get('answer', '')
    total_marks = data1.get('total_marks', '')
    rubrics = data1.get('rubrics', '')
    response = chatbot(question, answer, total_marks, rubrics)
    return response

if __name__ == '__main__':
    #app.debug = True
    app.run(host='0.0.0.0', port=5000)
    app.run(debug=False)

