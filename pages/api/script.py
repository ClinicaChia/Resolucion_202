import sys
import json
import pandas as pd

    
def search(lista,match):
    for el in lista:
        if(el == match):
            return True
    return False



path = "F:\\resolucion_202\\public\\files\\"+sys.argv[1]+"\\"
sede = sys.argv[1]
fn = sys.argv[2]

import zipfile
with zipfile.ZipFile(path+fn, 'r') as zip_ref:
    zip_ref.extractall(path)


#Se importan todos los archivos de la carpeta
detalleOrdenamiento = pd.read_excel( path + 'Detalle_Ordenamiento.xlsx')
ExamenesLab = pd.read_excel( path + 'Laboratorios.xlsx')
ExamenesLab = ExamenesLab[ExamenesLab['SEDE']==sede ]
ExamnenesMicro = pd.read_excel( path + 'Micros.xlsx')
Mamografias = pd.read_excel( path + 'Mamografias.xls')
historia = pd.read_excel( path + 'Historia_Clinica.xlsx')
validador = pd.read_excel( path + 'validador.xlsx')
f = open('F:\\resolucion_202\\pages\\api\\base.json')
db = json.load(f)
f.close()
examenes_lab = db['examenes_lab']
examenes_micro = db['pruebas_micro']
codigos = db['codigos']

pacientes = []
#se realiza el procesamiento
for grupo_nombre in codigos:
    i=0
    grupo = detalleOrdenamiento[detalleOrdenamiento['cod_dia'] == grupo_nombre]
    total = grupo.shape[0]
    for index, row in grupo.iterrows(): #Se recorre el detalle de ordenamiento
        
        i+=1
        temp = ExamenesLab[ExamenesLab['Historia'] == row['id_usr']] #Se extraen las filas que conincidan con la cedula
        temp2={}
        resultado_M = 24
        fecha_M = ''
        temp3 = ExamnenesMicro[ExamnenesMicro['Historia'] == row['id_usr']]
        temp4 = Mamografias[Mamografias['DOCUMENTO'] == row['id_usr']]
        
        if( temp.shape[0] or temp3.shape[0] or temp4.shape[0]): #se verifica cuantos examenes de laboratior exisite
            
            
            if( temp.shape[0] ):
                for index2, row2 in temp.iterrows():
                    examen = row2['Prueba']
                    
                    if(search(examenes_lab,examen)):

                        temp2[examen] = {'valor': row2['Resultado'], 'fecha': row2['Fecha Toma']}
            
            if( temp3.shape[0] ):
                
                for index2, row2 in temp3.iterrows():
                    examen = row2['Prueba']
                    
                    temp2[examen] = {'valor': row2['Resultado'], 'fecha': row2['Fecha Toma']}

            if( temp4.shape[0] ):
                
                resultado_M = Mamografias['BIRADS']
                fecha_M = Mamografias['FACTURACION']
            

                
            
            if(temp2):
                nombre = row['nom_usr'].split(' ')
                pacientes.append({ 'uid': row['id_usr'],
                                'doc':   row['tip_doc'],
                                'nombre1': nombre[0],
                                'nombre2':  nombre[1] if len(nombre) == 4 else '',
                                'apellido1':  nombre[2] if len(nombre) == 4 else nombre[1],
                                'apellido2':  nombre[3] if len(nombre) == 4 else nombre[2],
                                'sexo': row['sexo'],
                                'examenesLab': temp2,
                                'Mamografia': resultado_M if row['sexo'] == 'F' else '',
                                'fechaMamografia': fecha_M if row['sexo'] == 'F' else '',
                                'precio': row['tarifa']
                                })


#se genera el nuevo ecxel

def searchE(lista,match):
    for el in lista:
        if(el == match):
            return True
    return False






i = 0
for paciente in pacientes:
   
        fecha = historia[historia['identi'] == paciente['uid']]
        
        df = pd.DataFrame({
            
            'Tipo de registro':[2],
            'Consecutivo de registro':[i+1],
            'Código de habilitación IPS primaria':[251750013212],
            'Tipo de identificación del usuario': [paciente['doc']],
            'Numero de Identificacion': [paciente['uid']],
            'Primer apellido del usuario': [paciente['apellido1']],
            'Segundo apellido del usuario': [paciente['apellido2']],
            'Primer nombre del usuario': [paciente['nombre1']],
            'Segundo nombre del usuario': [paciente['nombre2']],
            'Fecha de Nacimiento ': [fecha['fecnac'].values[0] if fecha.shape[0] else ''],
            'Sexo': [paciente['sexo']],
            'Resultado de glicemia basal': [paciente['examenesLab']['GLICEMIA BASAL']['valor'] if searchE(paciente['examenesLab'].keys(), "GLICEMIA BASAL") else ''],
            'Fecha de toma glicemia basal': [paciente['examenesLab']['GLICEMIA BASAL']['fecha'] if searchE(paciente['examenesLab'].keys(), "GLICEMIA BASAL") else ''],
            'Resultado de LDL': [paciente['examenesLab']['LDL COLESTEROL']['valor'] if searchE(paciente['examenesLab'].keys(), "LDL COLESTEROL") else ''],
            'Fecha de toma LDL': [paciente['examenesLab']['LDL COLESTEROL']['fecha'] if searchE(paciente['examenesLab'].keys(), "LDL COLESTEROL") else ''],
            'Resultado de HDL': [paciente['examenesLab']['HDL COLESTEROL']['valor'] if searchE(paciente['examenesLab'].keys(), "HDL COLESTEROL") else ''],
            'Fecha de toma HDL': [paciente['examenesLab']['HDL COLESTEROL']['fecha'] if searchE(paciente['examenesLab'].keys(), "HDL COLESTEROL") else ''],
            'Resultado de triglicéridos': [paciente['examenesLab']['TRIGLICERIDOS']['valor'] if searchE(paciente['examenesLab'].keys(), "TRIGLICERIDOS") else ''],
            'Fecha de toma triglicéridos': [paciente['examenesLab']['TRIGLICERIDOS']['fecha'] if searchE(paciente['examenesLab'].keys(), "TRIGLICERIDOS") else ''],
            'Resultado de hemoglobina': [paciente['examenesLab']['HEMOGLOBINA']['valor'] if searchE(paciente['examenesLab'].keys(), "HEMOGLOBINA") else ''],
            'Fecha de toma hemoglobina': [paciente['examenesLab']['HEMOGLOBINA']['fecha'] if searchE(paciente['examenesLab'].keys(), "HEMOGLOBINA") else ''],
            'Resultado de creatinina': [paciente['examenesLab']['CREATININA']['valor'] if searchE(paciente['examenesLab'].keys(), "CREATININA") else ''],
            'Fecha de toma creatinina': [paciente['examenesLab']['CREATININA']['fecha'] if searchE(paciente['examenesLab'].keys(), "CREATININA") else ''],
            'Resultado de PSA': [paciente['examenesLab']['PSA TOTAL']['valor'] if searchE(paciente['examenesLab'].keys(), "PSA TOTAL") else ''],
            'Fecha de toma PSA': [paciente['examenesLab']['PSA TOTAL']['fecha'] if searchE(paciente['examenesLab'].keys(), "PSA TOTAL") else ''],
            'COP por persona': [paciente['precio']],
            

        })

        validador = pd.concat([validador, df], ignore_index = True, axis = 0)
        i+=1




validador.to_excel('F:\\resolucion_202\\public\\listos\\'+ sede + '.xlsx',index = False)




