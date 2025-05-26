"""
ملف قاعدة بيانات المواقع الأثرية في بابل

هذا الملف يحتوي على قاعدة بيانات للمواقع الأثرية في بابل مع معلومات مفصلة عن كل موقع
بما في ذلك الاسم والوصف والنوع والفترة التاريخية والإحداثيات وغيرها من المعلومات.
"""

class BabylonSitesDatabase:
    """فئة قاعدة بيانات المواقع الأثرية في بابل"""
    
    def __init__(self):
        """تهيئة قاعدة البيانات مع المواقع الأثرية"""
        self.sites = [
            {
                "id": 1,
                "name": "مدينة بابل القديمة",
                "description": "عاصمة الإمبراطورية البابلية القديمة وأحد أهم المواقع الأثرية في العراق والعالم",
                "type": "مدينة أثرية",
                "period": "البابلي القديم والحديث",
                "visit_duration": 180,  # بالدقائق
                "coordinates": {"latitude": 32.5355, "longitude": 44.4275},
                "popularity": 9.8,
                "accessibility": 8.5,
                "best_time": ["الربيع", "الخريف"],
                "facilities": ["مرشدين سياحيين", "مواقف سيارات", "استراحات"],
                "entrance_fee": 10,  # بالدولار
                "image": "site_1.webp"
            },
            {
                "id": 2,
                "name": "برج بابل",
                "description": "برج شهير ذكر في النصوص الدينية والتاريخية، يعتبر من أهم معالم بابل القديمة",
                "type": "برج أثري",
                "period": "البابلي القديم",
                "visit_duration": 60,
                "coordinates": {"latitude": 32.5362, "longitude": 44.4203},
                "popularity": 9.5,
                "accessibility": 7.0,
                "best_time": ["الربيع"],
                "facilities": ["مرشدين سياحيين"],
                "entrance_fee": 8,
                "image": "site_2.jpg"
            },
            {
                "id": 3,
                "name": "بوابة عشتار",
                "description": "بوابة مزخرفة بالقرميد الأزرق اللامع والتماثيل، تعتبر من أجمل البوابات الأثرية في العالم",
                "type": "بوابة أثرية",
                "period": "البابلي الحديث",
                "visit_duration": 45,
                "coordinates": {"latitude": 32.5429, "longitude": 44.4212},
                "popularity": 9.7,
                "accessibility": 9.0,
                "best_time": ["الربيع", "الخريف", "الشتاء"],
                "facilities": ["مرشدين سياحيين", "مواقف سيارات", "متجر هدايا"],
                "entrance_fee": 0,
                "image": "site_3.jpg"
            },
            {
                "id": 4,
                "name": "شارع الموكب",
                "description": "شارع مرصوف بالحجارة كان يستخدم للمواكب الدينية والاحتفالات الملكية في بابل القديمة",
                "type": "شارع أثري",
                "period": "البابلي الحديث",
                "visit_duration": 30,
                "coordinates": {"latitude": 32.5438, "longitude": 44.4208},
                "popularity": 8.9,
                "accessibility": 9.5,
                "best_time": ["الربيع", "الخريف", "الشتاء"],
                "facilities": ["مرشدين سياحيين"],
                "entrance_fee": 0,
                "image": "site_4.jpg"
            },
            {
                "id": 5,
                "name": "قصر نبوخذ نصر",
                "description": "قصر الملك البابلي الشهير نبوخذ نصر الثاني، أحد أعظم ملوك بابل",
                "type": "قصر أثري",
                "period": "البابلي الحديث",
                "visit_duration": 90,
                "coordinates": {"latitude": 32.5415, "longitude": 44.4231},
                "popularity": 9.3,
                "accessibility": 8.0,
                "best_time": ["الربيع", "الخريف"],
                "facilities": ["مرشدين سياحيين", "مواقف سيارات", "استراحات"],
                "entrance_fee": 0,
                "image": "site_5.jpg"
            },
            {
                "id": 6,
                "name": "الحدائق المعلقة",
                "description": "إحدى عجائب الدنيا السبع في العالم القديم، حدائق مدرجة بناها الملك نبوخذ نصر",
                "type": "حدائق أثرية",
                "period": "البابلي الحديث",
                "visit_duration": 75,
                "coordinates": {"latitude": 32.5382, "longitude": 44.4219},
                "popularity": 9.9,
                "accessibility": 7.5,
                "best_time": ["الربيع"],
                "facilities": ["مرشدين سياحيين", "مواقف سيارات", "استراحات", "متجر هدايا"],
                "entrance_fee": 12,
                "image": "site_6.jpg"
            },
            {
                "id": 7,
                "name": "معبد إيساجيلا",
                "description": "معبد الإله مردوخ، كبير آلهة بابل، وأحد أهم المعابد الدينية في المدينة",
                "type": "معبد أثري",
                "period": "البابلي القديم والحديث",
                "visit_duration": 60,
                "coordinates": {"latitude": 32.5367, "longitude": 44.4242},
                "popularity": 9.0,
                "accessibility": 7.0,
                "best_time": ["الربيع", "الخريف"],
                "facilities": ["مرشدين سياحيين"],
                "entrance_fee": 6,
                "image": "site_7.jpg"
            },
            {
                "id": 8,
                "name": "الزقورة البابلية",
                "description": "برج معبدي مدرج يعتبر من أهم المعالم الدينية في حضارة بلاد الرافدين",
                "type": "برج معبدي",
                "period": "البابلي القديم",
                "visit_duration": 45,
                "coordinates": {"latitude": 32.5372, "longitude": 44.4258},
                "popularity": 8.8,
                "accessibility": 6.5,
                "best_time": ["الربيع", "الخريف"],
                "facilities": ["مرشدين سياحيين"],
                "entrance_fee": 5,
                "image": "site_8.jpg"
            },
            {
                "id": 9,
                "name": "متحف بابل",
                "description": "متحف يعرض القطع الأثرية والتماثيل والأدوات التي تم اكتشافها في مدينة بابل",
                "type": "متحف",
                "period": "حديث",
                "visit_duration": 120,
                "coordinates": {"latitude": 32.5312, "longitude": 44.4198},
                "popularity": 8.5,
                "accessibility": 9.5,
                "best_time": ["طوال العام"],
                "facilities": ["مرشدين سياحيين", "مواقف سيارات", "استراحات", "متجر هدايا", "مقهى"],
                "entrance_fee": 8,
                "image": "site_9.jpg"
            },
            {
                "id": 10,
                "name": "أسد بابل",
                "description": "تمثال حجري ضخم لأسد يقف فوق إنسان، يرمز إلى قوة وعظمة بابل",
                "type": "تمثال أثري",
                "period": "البابلي الحديث",
                "visit_duration": 20,
                "coordinates": {"latitude": 32.5401, "longitude": 44.4187},
                "popularity": 8.7,
                "accessibility": 9.0,
                "best_time": ["طوال العام"],
                "facilities": ["مرشدين سياحيين"],
                "entrance_fee": 0,
                "image": "site_10.jpg"
            },
            {
                "id": 11,
                "name": "سور بابل",
                "description": "سور ضخم كان يحيط بمدينة بابل القديمة لحمايتها من الغزاة",
                "type": "سور أثري",
                "period": "البابلي الحديث",
                "visit_duration": 90,
                "coordinates": {"latitude": 32.5342, "longitude": 44.4301},
                "popularity": 8.3,
                "accessibility": 7.5,
                "best_time": ["الربيع", "الخريف"],
                "facilities": ["مرشدين سياحيين", "مواقف سيارات"],
                "entrance_fee": 4,
                "image": "site_11.jpg"
            },
            {
                "id": 12,
                "name": "بيت الكتابات المسمارية",
                "description": "موقع أثري يضم مجموعة من الألواح الطينية المكتوبة بالخط المسماري",
                "type": "موقع أثري",
                "period": "البابلي القديم والحديث",
                "visit_duration": 40,
                "coordinates": {"latitude": 32.5389, "longitude": 44.4176},
                "popularity": 8.0,
                "accessibility": 8.0,
                "best_time": ["الربيع", "الخريف", "الشتاء"],
                "facilities": ["مرشدين سياحيين"],
                "entrance_fee": 5,
                "image": "site_12.jpg"
            },
            {
                "id": 13,
                "name": "معبد نابو",
                "description": "معبد مخصص للإله نابو، إله الحكمة والكتابة في الديانة البابلية",
                "type": "معبد أثري",
                "period": "البابلي الحديث",
                "visit_duration": 50,
                "coordinates": {"latitude": 32.5356, "longitude": 44.4312},
                "popularity": 7.9,
                "accessibility": 7.0,
                "best_time": ["الربيع", "الخريف"],
                "facilities": ["مرشدين سياحيين"],
                "entrance_fee": 5,
                "image": "site_13.jpg"
            },
            {
                "id": 14,
                "name": "قناة المياه البابلية",
                "description": "نظام ري متطور استخدمه البابليون لنقل المياه إلى المدينة والحدائق",
                "type": "نظام مائي أثري",
                "period": "البابلي الحديث",
                "visit_duration": 35,
                "coordinates": {"latitude": 32.5421, "longitude": 44.4156},
                "popularity": 7.5,
                "accessibility": 6.5,
                "best_time": ["الربيع"],
                "facilities": ["مرشدين سياحيين"],
                "entrance_fee": 3,
                "image": "site_14.jpg"
            },
            {
                "id": 15,
                "name": "مرصد بابل الفلكي",
                "description": "موقع كان يستخدمه الكهنة البابليون لرصد النجوم والكواكب ودراسة الفلك",
                "type": "مرصد أثري",
                "period": "البابلي الحديث",
                "visit_duration": 45,
                "coordinates": {"latitude": 32.5378, "longitude": 44.4329},
                "popularity": 8.2,
                "accessibility": 7.0,
                "best_time": ["الربيع", "الخريف"],
                "facilities": ["مرشدين سياحيين"],
                "entrance_fee": 6,
                "image": "site_15.jpg"
            },
            {
                "id": 16,
                "name": "مقبرة ملوك بابل",
                "description": "مقبرة تضم رفات بعض ملوك بابل والنبلاء والشخصيات المهمة",
                "type": "مقبرة أثرية",
                "period": "البابلي القديم والحديث",
                "visit_duration": 60,
                "coordinates": {"latitude": 32.5334, "longitude": 44.4267},
                "popularity": 7.8,
                "accessibility": 6.0,
                "best_time": ["الربيع", "الخريف"],
                "facilities": ["مرشدين سياحيين"],
                "entrance_fee": 7,
                "image": "site_16.jpg"
            },
            {
                "id": 17,
                "name": "ساحة الاحتفالات البابلية",
                "description": "ساحة كبيرة كانت تقام فيها الاحتفالات والمناسبات الدينية والملكية",
                "type": "ساحة أثرية",
                "period": "البابلي الحديث",
                "visit_duration": 25,
                "coordinates": {"latitude": 32.5397, "longitude": 44.4234},
                "popularity": 7.7,
                "accessibility": 9.0,
                "best_time": ["الربيع", "الخريف"],
                "facilities": ["مرشدين سياحيين", "مواقف سيارات"],
                "entrance_fee": 0,
                "image": "site_17.jpg"
            },
            {
                "id": 18,
                "name": "بيت الحرف البابلي",
                "description": "ورشة أثرية تظهر كيف كان الحرفيون البابليون يصنعون الأدوات والحلي",
                "type": "ورشة أثرية",
                "period": "البابلي القديم والحديث",
                "visit_duration": 40,
                "coordinates": {"latitude": 32.5361, "longitude": 44.4189},
                "popularity": 7.6,
                "accessibility": 8.0,
                "best_time": ["الربيع", "الخريف", "الشتاء"],
                "facilities": ["مرشدين سياحيين", "متجر هدايا"],
                "entrance_fee": 5,
                "image": "site_18.jpg"
            },
            {
                "id": 19,
                "name": "مركز الزوار في بابل",
                "description": "مركز حديث يقدم معلومات وعروضاً تفاعلية عن تاريخ بابل وحضارتها",
                "type": "مركز زوار",
                "period": "حديث",
                "visit_duration": 60,
                "coordinates": {"latitude": 32.5325, "longitude": 44.4221},
                "popularity": 8.6,
                "accessibility": 9.5,
                "best_time": ["طوال العام"],
                "facilities": ["مرشدين سياحيين", "مواقف سيارات", "استراحات", "متجر هدايا", "مقهى", "دورات مياه"],
                "entrance_fee": 3,
                "image": "site_19.jpg"
            },
            {
                "id": 20,
                "name": "تل بابل الأثري",
                "description": "تل أثري يضم طبقات من الحضارات المختلفة التي تعاقبت على مدينة بابل",
                "type": "تل أثري",
                "period": "متعدد العصور",
                "visit_duration": 70,
                "coordinates": {"latitude": 32.5348, "longitude": 44.4293},
                "popularity": 7.4,
                "accessibility": 6.0,
                "best_time": ["الربيع", "الخريف"],
                "facilities": ["مرشدين سياحيين"],
                "entrance_fee": 4,
                "image": "site_20.jpg"
            }
        ]
    
    def get_all_sites(self):
        return self.sites
    
    def get_site_by_id(self, site_id):
        for site in self.sites:
            if site["id"] == site_id:
                return site
        return None
    
    def search_sites(self, keyword):
        keyword = keyword.lower()
        results = []
        
        for site in self.sites:
            if (keyword in site["name"].lower() or 
                keyword in site["description"].lower() or 
                keyword in site["type"].lower()):
                results.append(site)
        
        return results
    
    def get_sites_by_type(self, site_type):
        return [site for site in self.sites if site["type"] == site_type]
    
    def get_sites_by_period(self, period):
        return [site for site in self.sites if period in site["period"]]
    
    def get_sites_by_duration(self, max_duration):
        return [site for site in self.sites if site["visit_duration"] <= max_duration]
    
    def get_sites_by_popularity(self, min_popularity):
        return [site for site in self.sites if site["popularity"] >= min_popularity]
    
    def get_sites_by_accessibility(self, min_accessibility):
        return [site for site in self.sites if site["accessibility"] >= min_accessibility]
    
    def get_sites_by_entrance_fee(self, max_fee):
        return [site for site in self.sites if site["entrance_fee"] <= max_fee]
    
    def get_sites_coordinates(self):
        coordinates = []
        
        for site in self.sites:
            coordinates.append({
                "id": site["id"],
                "name": site["name"],
                "latitude": site["coordinates"]["latitude"],
                "longitude": site["coordinates"]["longitude"]
            })
        
        return coordinates
    
    def get_nearby_sites(self, latitude, longitude, radius=0.01):
        nearby_sites = []
        
        for site in self.sites:
            site_lat = site["coordinates"]["latitude"]
            site_lng = site["coordinates"]["longitude"]
            
            # حساب المسافة التقريبية (هذه طريقة مبسطة)
            """
            (x2-x1)2+(y2-y1)2
            """
            distance = ((site_lat - latitude) ** 2 + (site_lng - longitude) ** 2) ** 0.5
            
            if distance <= radius:
                nearby_sites.append(site)
        
        return nearby_sites
    
    def get_sites_with_facility(self, facility):
        return [site for site in self.sites if facility in site["facilities"]]
    
    def get_sites_for_season(self, season):
        return [site for site in self.sites if season in site["best_time"] or "طوال العام" in site["best_time"]]



if __name__ == "__main__":

    db = BabylonSitesDatabase()
    

    sites = db.get_all_sites()
    print(f"عدد المواقع الأثرية: {len(sites)}")
    
    site = db.get_site_by_id(1)
    if site:
        print(f"\nمعلومات عن {site['name']}:")
        print(f"الوصف: {site['description']}")
        print(f"النوع: {site['type']}")
        print(f"الفترة: {site['period']}")
        print(f"الإحداثيات: {site['coordinates']['latitude']}, {site['coordinates']['longitude']}")
    
    coordinates = db.get_sites_coordinates()
    print("\nإحداثيات المواقع الأثرية:")
    for coord in coordinates[:3]:  # عرض أول 3 مواقع فقط
        print(f"{coord['name']}: {coord['latitude']}, {coord['longitude']}")
