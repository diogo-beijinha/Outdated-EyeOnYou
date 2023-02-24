# tutorial from https://projectgurukul.org/deep-learning-project-face-recognition-with-python-opencv/

# used to recognize/match faces
import sqlite3
import face_recognition
import cv2
import numpy as np
import glob
import pickle
import pandas as pd
from datetime import datetime
import _datetime
from datetime import date

f = open("ref_name.pkl", "rb")
ref_dictt = pickle.load(f)
f.close()
f = open("ref_embed.pkl", "rb")
embed_dictt = pickle.load(f)
f.close()

known_face_encodings = []
known_face_names = []
for ref_id, embed_list in embed_dictt.items():
    for my_embed in embed_list:
        known_face_encodings += [my_embed]
        known_face_names += [ref_id]

# video_capture = cv2.VideoCapture(0)
video_capture = cv2.VideoCapture(0, cv2.CAP_DSHOW)  # Webcam - video_capture = cv2.VideoCapture(1, cv2.CAP_DSHOW)
face_locations = []
face_encodings = []
face_names = []
captured_face = ""  # not from the tutorial
process_this_frame = True
while True:

    ret, frame = video_capture.read()
    small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
    rgb_small_frame = small_frame[:, :, ::-1]
    if process_this_frame:
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)
        face_names = []
        for face_encoding in face_encodings:
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
            name = "Unknown"
            face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index]:
                name = known_face_names[best_match_index]
            face_names.append(name)
    process_this_frame = not process_this_frame
    for (top_s, right, bottom, left), name in zip(face_locations, face_names):
        top_s *= 4
        right *= 4
        bottom *= 4
        left *= 4
        cv2.rectangle(frame, (left, top_s), (right, bottom), (0, 255, 0), 2)
        cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 255, 0), cv2.FILLED)
        font = cv2.FONT_HERSHEY_DUPLEX
        cv2.putText(frame, ref_dictt[name], (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)
        captured_face = ref_dictt[name]  # not from tutorial
        # today = _datetime.date.today()
        # todayDate = today.strftime("%d/%m/%Y")
        # today = date.today()
        # timeNow = datetime.now()
        # current_time = timeNow.strftime("%H:%M:%S")
    font = cv2.FONT_HERSHEY_DUPLEX
    cv2.imshow('Video', frame)
    ###
    recognized_id = 0

    objects = pd.read_pickle(r'ref_name.pkl')

    for key, value in objects.items():
        if value == captured_face:
            recognized_id = key

        print("{} - {}".format(recognized_id, captured_face))

    ###
    if cv2.waitKey(1) & 0xFF == ord('q'):
        print("Programa a fechar...")
        break
video_capture.release()
cv2.destroyAllWindows()
