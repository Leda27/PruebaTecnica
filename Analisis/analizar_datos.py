import csv
from collections import defaultdict

class PetDataAnalyzer:
    def __init__(self, csv_path):
        self.data = []
        self.load_data(csv_path)
    
    def load_data(self, csv_path):
        """Carga los datos desde un archivo CSV"""
        with open(csv_path, mode='r', encoding='utf-8') as file:
            reader = csv.reader(file)
            next(reader)  
            for row in reader:
                self.data.append(row)
    
    def analyze_by_locality(self):
        """Agrupa los datos por localidad, especie y estrato"""
        locality_data = defaultdict(lambda: {
            'total_animals': 0,
            'species': {'Canino': 0, 'Felino': 0},
            'strata': defaultdict(int)
        })

        for row in self.data:
            localidad = row[7]  
            especie = row[2]   
            estrato = row[8]    

            locality_data[localidad]['total_animals'] += 1
            if especie in locality_data[localidad]['species']:
                locality_data[localidad]['species'][especie] += 1
            locality_data[localidad]['strata'][estrato] += 1
        

        sorted_localities = sorted(locality_data.items(), key=lambda x: x[1]['total_animals'], reverse=True)
        
        return sorted_localities
    
    def generate_marketing_recommendations(self, locality_data):
        recommendations = []

        for locality, data in locality_data[:5]:  
            top_species = max(data['species'], key=data['species'].get)
            top_stratum = max(data['strata'], key=data['strata'].get)
            
            recommendations.append({
                'locality': locality,
                'total_animals': data['total_animals'],
                'top_species': top_species,
                'top_stratum': top_stratum,
                'species_count': data['species'][top_species],
                'stratum_count': data['strata'][top_stratum]
            })

        return recommendations
    
    def print_recommendations(self, recommendations):
        print("Conclusión de la propuesta para XYZ SAS:\n")
        print("-------------------------------------------")
        
        for index, rec in enumerate(recommendations, 1):
            print(f"Recomendación {index}:")
            print(f"- Localidad: {rec['locality']}")
            print(f"- Total de animales registrados: {rec['total_animals']}")
            print(f"- Especie principal: {rec['top_species']} ({rec['species_count']} registros)")
            print(f"- Estrato predominante: {rec['top_stratum']} ({rec['stratum_count']} registros)\n")


csv_path = 'C:/Users/danic/OneDrive - SENA/PRUEBAS DE SELECCION/Analisis/reporte_corte_31_12_2019_microchips.xlsx - reporte_bogota_como_vamos.csv'

analyzer = PetDataAnalyzer(csv_path)


locality_data = analyzer.analyze_by_locality()


recommendations = analyzer.generate_marketing_recommendations(locality_data)
analyzer.print_recommendations(recommendations)
