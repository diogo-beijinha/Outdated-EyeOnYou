from django.shortcuts import render
from django.contrib.auth.decorators import login_required
import sys
import cv2
import face_recognition
import pickle
import numpy as np
import glob
import pandas as pd
from datetime import datetime
import _datetime
from datetime import date
from pages.models import Test
from pages.views import home_page
import os
from pages.models import Registered, Detected

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))


@login_required(login_url='conta/login/?next=/conta/')
def main(request):
    return render(request, 'main.html')


@login_required(login_url='conta/login/?next=/conta/')
def registar(request):
    name = input("Insira o nome: ")
    ref_id = input("Insira um ID: ")

    try:
        f = open("/static/pikle/ref_name.pkl", "rb")
        ref_dictt = pickle.load(f)
        f.close()
    except:
        ref_dictt = {}
    ref_dictt[ref_id] = name
    f = open("static/pikle/ref_name.pkl", "wb")
    pickle.dump(ref_dictt, f)
    f.close()
    try:
        f = open("static/pikle/ref_embed.pkl", "rb")
        embed_dictt = pickle.load(f)
        f.close()
    except:
        embed_dictt = {}

    for i in range(5):
        key = cv2.waitKey(1)
        # webcam = cv2.VideoCapture(0)
        webcam = cv2.VideoCapture(1,
                                  cv2.CAP_DSHOW)  # captureDevice = camera(changed the previous line with this one.. delete it and uncomment the previous line if any problems occur)
        print("--- A capturar foto {}/5 ---".format(i + 1))
        print("Pressione S para capturar foto")

        while True:

            check, frame = webcam.read()
            cv2.imshow("Capturing", frame)
            small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
            rgb_small_frame = small_frame[:, :, ::-1]

            key = cv2.waitKey(1)
            if key == ord('s'):
                face_locations = face_recognition.face_locations(rgb_small_frame)
                if face_locations != []:
                    face_encoding = face_recognition.face_encodings(frame)[0]
                    if ref_id in embed_dictt:
                        embed_dictt[ref_id] += [face_encoding]
                    else:
                        embed_dictt[ref_id] = [face_encoding]
                    webcam.release()
                    cv2.waitKey(1)
                    cv2.destroyAllWindows()
                    break
            elif key == ord('q'):
                print("A desligar câmara")
                webcam.release()
                print("Câmara desligada")
                print("Programa Terminado")
                cv2.destroyAllWindows()
                break

    f = open("static/pikle/ref_embed.pkl", "wb")
    pickle.dump(embed_dictt, f)
    f.close()
    registado = Registered()
    registado.user_id = ref_id
    registado.name = name
    registado.date = datetime.now()
    registado.created_by = request.user.email
    registado.save()

    return render(request, 'index.html')

    # run and capture 5 pics(press 's' to take picture or 'q' to quit)


@login_required(login_url='conta/login/?next=/conta/')
def recon(request):
    f = open("static/pikle/ref_name.pkl", "rb")
    ref_dictt = pickle.load(f)
    f.close()
    f = open("static/pikle/ref_embed.pkl", "rb")
    embed_dictt = pickle.load(f)
    f.close()

    known_face_encodings = []
    known_face_names = []
    for ref_id, embed_list in embed_dictt.items():
        for my_embed in embed_list:
            known_face_encodings += [my_embed]
            known_face_names += [ref_id]

    # video_capture = cv2.VideoCapture(0)
    video_capture = cv2.VideoCapture(1, cv2.CAP_DSHOW)  # Webcam - video_capture = cv2.VideoCapture(1, cv2.CAP_DSHOW)
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
            if name == "Unknown":
                Unidientified_person = "Desconhecido"
                cv2.putText(frame, Unidientified_person, (left + 15, bottom - 15), font, 0.7, (255, 255, 255), 1)
                captured_face = "Desconhecido"
                recognized_id = "Desconhecido"
            else:
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

        objects = pd.read_pickle(r'static/pikle/ref_name.pkl')

        prev_person = None
        for key, value in objects.items():
            if value == captured_face:
                recognized_id = key

                detectado = Detected()
                detectado.first_name = captured_face
                detectado.last_name = captured_face
                detectado.date = datetime.now()
                detectado.recognized = 1
                detectado.save()



            '''
            print("{} - {}".format(recognized_id, captured_face))
            detectado = Detected()
            if captured_face == "Desconhecido":
                detectado.first_name = "Desconhecido"
                detectado.last_name = "Desconhecido"
                detectado.date = datetime.now()
                detectado.recognized = 0
                detectado.save()
            elif captured_face == "":
                pass
            else:
                detectado.first_name = captured_face
                detectado.last_name = captured_face
                detectado.date = datetime.now()
                detectado.recognized = 1
                detectado.save()
            '''

            '''
                        if prev_id != recognized_id:
                print("{} - {}".format(recognized_id, captured_face))
                detectado = Detected()
                detectado.first_name = captured_face
                detectado.last_name = captured_face
                detectado.date = datetime.now()
                detectado.recognized = 1
                detectado.save()
            else:
                pass
                
                
                
                
                id_antigo = recognized_id
                        nome_completo = captured_face.split()
                        primeiro_nome = nome_completo[0]
                        apelido = nome_completo[1]
                        pessoa_antes["nome1"] = primeiro_nome
                        pessoa_antes["nome2"] = apelido
                        pessoa_antes["data"] = datetime.now()
                        pessoa_antes["reconhecido"] = 1
                        detectado.first_name = pessoa_antes["nome1"]
                        detectado.last_name = pessoa_antes["nome2"]
                        detectado.date = pessoa_antes["data"]
                        detectado.recognized = pessoa_antes["reconhecido"]
                        detectado.save()
            '''


        ###
        if cv2.waitKey(1) & 0xFF == ord('q'):
            print("Programa a fechar...")
            break
    video_capture.release()
    cv2.destroyAllWindows()
    return render(request, 'index.html')
