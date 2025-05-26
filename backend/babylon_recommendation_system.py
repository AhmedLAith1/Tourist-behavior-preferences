
import numpy as np
from .babylon_decision_tree import BabylonDecisionTree
from .babylon_sites_database import BabylonSitesDatabase

class BabylonRecommendationSystem:
    
    def __init__(self):
        self.decision_tree = BabylonDecisionTree()
        self.sites_db = BabylonSitesDatabase()
        self.user_answers = {}
        self.recommendations = []
        self.questions = [
            {"id": 1, "text": "ما هو نوع الآثار المفضل لديك؟", "options": ["المعابد", "القصور", "الأسوار والبوابات", "المتاحف", "أخرى"]},
            {"id": 2, "text": "ما هي الفترة التاريخية المفضلة لديك؟", "options": ["العصر البابلي القديم", "العصر البابلي الحديث", "كلاهما", "لا يهم"]},
            {"id": 3, "text": "ما هي مدة الزيارة المفضلة لديك؟", "options": ["قصيرة (أقل من 30 دقيقة)", "متوسطة (30-60 دقيقة)", "طويلة (1-2 ساعة)", "طويلة جداً (أكثر من ساعتين)"]},
            {"id": 4, "text": "هل تفضل المواقع الأثرية الشهيرة أم الأقل شهرة؟", "options": ["الشهيرة جداً", "الشهيرة", "متوسطة الشهرة", "الأقل شهرة"]},
            {"id": 5, "text": "ما مدى أهمية سهولة الوصول إلى الموقع بالنسبة لك؟", "options": ["مهم جداً", "مهم", "متوسط الأهمية", "غير مهم"]},
            {"id": 6, "text": "ما هي رسوم الدخول المفضلة لديك؟", "options": ["مجاني", "منخفضة (1-5 دولار)", "متوسطة (6-10 دولار)", "مرتفعة (أكثر من 10 دولار)"]},
            {"id": 7, "text": "ما هو الموسم المفضل لديك للزيارة؟", "options": ["الربيع", "الصيف", "الخريف", "الشتاء", "لا يهم"]},
            {"id": 8, "text": "هل تفضل المواقع التي توفر مرافق إضافية (مثل المقاهي والمتاجر)؟", "options": ["نعم، مهم جداً", "مفضل ولكن ليس ضرورياً", "لا يهم"]},
            {"id": 9, "text": "هل تهتم بالتصوير الفوتوغرافي أثناء زيارتك؟", "options": ["نعم، بشكل كبير", "نعم، بشكل متوسط", "لا أهتم كثيراً"]},
            {"id": 10, "text": "كم عدد المواقع التي ترغب في زيارتها خلال رحلتك؟", "options": ["1-3 مواقع", "4-6 مواقع", "7-10 مواقع", "أكثر من 10 مواقع"]},
            {"id": 11, "text": "هل تفضل المواقع القريبة من بعضها البعض؟", "options": ["نعم، أفضل المواقع المتقاربة", "لا يهم، يمكنني التنقل بين المواقع البعيدة"]},
            {"id": 12, "text": "ما هي مدة إقامتك في بابل؟", "options": ["يوم واحد", "2-3 أيام", "4-7 أيام", "أكثر من أسبوع"]}
        ]
        
        self.train_model()
    
    def train_model(self):
        sites = self.sites_db.get_all_sites()
        self.decision_tree.train(self.questions, sites)
    
    def get_questions(self):
        return self.questions
    
    def set_user_answer(self, question_id, answer_index):
        self.user_answers[question_id] = answer_index
    
    def get_user_answers(self):
        return self.user_answers
    
    def clear_user_answers(self):
        self.user_answers = {}
        self.recommendations = []
    
    def generate_recommendations(self, top_n=5):
        """توليد التوصيات بناءً على إجابات المستخدم"""
        if len(self.user_answers) < 6:
            raise ValueError("يجب الإجابة على الأسئلة الستة الأولى على الأقل")
        
        # استخدام نموذج شجرة القرار للتنبؤ بالموقع المناسب
        site_id, probabilities = self.decision_tree.predict(self.user_answers)
        
        # الحصول على جميع المواقع
        all_sites = self.sites_db.get_all_sites()
        
        # حساب درجة التطابق لكل موقع
        site_scores = []
        for i, site in enumerate(all_sites):
            # استخدام احتمالات النموذج إذا كانت متاحة
            if i < len(probabilities):
                base_score = probabilities[i]
            else:
                base_score = 0.1  # قيمة افتراضية منخفضة
            
            # تعديل الدرجة بناءً على الإجابات الإضافية
            adjusted_score = base_score
            
            # تعديل حسب الموسم المفضل (السؤال 7)
            if 7 in self.user_answers:
                seasons = ["الربيع", "الصيف", "الخريف", "الشتاء"]
                preferred_season = seasons[self.user_answers[7]] if self.user_answers[7] < 4 else None
                if preferred_season and preferred_season in site["best_time"]:
                    adjusted_score *= 1.2
            
            # تعديل حسب تفضيل المرافق (السؤال 8)
            if 8 in self.user_answers and self.user_answers[8] == 0:  # مهم جداً
                if len(site["facilities"]) > 3:  # إذا كان الموقع يوفر العديد من المرافق
                    adjusted_score *= 1.3
            
            # تعديل حسب الاهتمام بالتصوير (السؤال 9)
            if 9 in self.user_answers and self.user_answers[9] == 0:  # مهتم بشكل كبير
                if site["popularity"] > 8.5:  # المواقع الشهيرة عادة ما تكون جيدة للتصوير
                    adjusted_score *= 1.2
            
            # إضافة الموقع ودرجة التطابق إلى القائمة
            site_scores.append((site, adjusted_score))
        
        # ترتيب المواقع حسب درجة التطابق (تنازلياً)
        site_scores.sort(key=lambda x: x[1], reverse=True)
        
        # اختيار أفضل N مواقع
        top_sites = site_scores[:top_n]
        
        # تحويل النتائج إلى تنسيق مناسب
        self.recommendations = [
            {
                "site": site,
                "match_score": float(score)
            }
            for site, score in top_sites
        ]
        
        return self.recommendations
    
    def get_recommendations(self):
        """الحصول على التوصيات المخزنة"""
        return self.recommendations
    
    def get_recommendation_details(self, site_id):
        """الحصول على تفاصيل توصية محددة"""
        for rec in self.recommendations:
            if rec["site"]["id"] == site_id:
                return rec
        return None
    
    def generate_itinerary(self, days=1):
        """توليد مسار سياحي لعدد محدد من الأيام"""
        if not self.recommendations:
            self.generate_recommendations(top_n=20)  # الحصول على عدد كافٍ من التوصيات
        
        # تحديد عدد المواقع في اليوم بناءً على إجابة المستخدم على السؤال 10
        sites_per_day = 3  # افتراضي
        if 10 in self.user_answers:
            if self.user_answers[10] == 0:  # 1-3 مواقع
                sites_per_day = 2
            elif self.user_answers[10] == 1:  # 4-6 مواقع
                sites_per_day = 4
            elif self.user_answers[10] == 2:  # 7-10 مواقع
                sites_per_day = 6
            elif self.user_answers[10] == 3:  # أكثر من 10 مواقع
                sites_per_day = 8
        
        # الحصول على المواقع الموصى بها
        recommended_sites = [rec["site"] for rec in self.recommendations]
        
        # تحديد ما إذا كان المستخدم يفضل المواقع المتقاربة (السؤال 11)
        prefer_nearby = True
        if 11 in self.user_answers:
            prefer_nearby = (self.user_answers[11] == 0)
        
        # إنشاء المسار السياحي
        itinerary = []
        remaining_sites = recommended_sites.copy()
        
        for day in range(days):
            day_sites = []
            
            # اختيار الموقع الأول لليوم
            if remaining_sites:
                first_site = remaining_sites.pop(0)
                day_sites.append(first_site)
                
                # إذا كان المستخدم يفضل المواقع المتقاربة، اختر المواقع القريبة
                if prefer_nearby:
                    # الحصول على المواقع القريبة
                    first_lat = first_site["coordinates"]["latitude"]
                    first_lng = first_site["coordinates"]["longitude"]
                    
                    # ترتيب المواقع المتبقية حسب المسافة
                    def distance(site):
                        site_lat = site["coordinates"]["latitude"]
                        site_lng = site["coordinates"]["longitude"]
                        return ((site_lat - first_lat) ** 2 + (site_lng - first_lng) ** 2) ** 0.5
                    
                    remaining_sites.sort(key=distance)
            
            # إضافة المواقع المتبقية لليوم
            while len(day_sites) < sites_per_day and remaining_sites:
                day_sites.append(remaining_sites.pop(0))
            
            itinerary.append(day_sites)
        
        return itinerary
    
    def export_recommendations_to_json(self):
        """تصدير التوصيات إلى تنسيق JSON"""
        if not self.recommendations:
            return None
        
        # إنشاء قائمة مبسطة من التوصيات
        simplified_recommendations = []
        for rec in self.recommendations:
            site = rec["site"]
            simplified_recommendations.append({
                "id": site["id"],
                "name": site["name"],
                "description": site["description"],
                "type": site["type"],
                "coordinates": {
                    "latitude": site["coordinates"]["latitude"],
                    "longitude": site["coordinates"]["longitude"]
                },
                "match_score": rec["match_score"]
            })
        
        return simplified_recommendations
    
    def export_itinerary_to_json(self, days=1):
        """تصدير المسار السياحي إلى تنسيق JSON"""
        itinerary = self.generate_itinerary(days)
        
        # إنشاء قائمة مبسطة من المسار السياحي
        simplified_itinerary = []
        for day_index, day_sites in enumerate(itinerary):
            day_data = {
                "day": day_index + 1,
                "sites": []
            }
            
            for site in day_sites:
                day_data["sites"].append({
                    "id": site["id"],
                    "name": site["name"],
                    "coordinates": {
                        "latitude": site["coordinates"]["latitude"],
                        "longitude": site["coordinates"]["longitude"]
                    }
                })
            
            simplified_itinerary.append(day_data)
        
        return simplified_itinerary


# إذا تم تشغيل هذا الملف مباشرة
if __name__ == "__main__":
    # إنشاء نسخة من نظام التوصية
    recommender = BabylonRecommendationSystem()
    
    # تعيين إجابات المستخدم (مثال)
    recommender.set_user_answer(1, 0)  # تفضيل المعابد
    recommender.set_user_answer(2, 1)  # تفضيل العصر البابلي الحديث
    recommender.set_user_answer(3, 2)  # تفضيل زيارات طويلة
    recommender.set_user_answer(4, 0)  # تفضيل المواقع الشهيرة جداً
    recommender.set_user_answer(5, 1)  # سهولة الوصول مهمة
    recommender.set_user_answer(6, 1)  # تفضيل رسوم دخول منخفضة
    recommender.set_user_answer(7, 0)  # تفضيل الربيع
    recommender.set_user_answer(10, 1)  # 4-6 مواقع
    recommender.set_user_answer(11, 0)  # تفضيل المواقع المتقاربة
    recommender.set_user_answer(12, 1)  # 2-3 أيام
    
    # توليد التوصيات
    recommendations = recommender.generate_recommendations(top_n=5)
    
    # عرض التوصيات
    print("التوصيات:")
    for i, rec in enumerate(recommendations):
        site = rec["site"]
        score = rec["match_score"]
        print(f"{i+1}. {site['name']} (درجة التطابق: {score:.2f})")
        print(f"   الإحداثيات: {site['coordinates']['latitude']}, {site['coordinates']['longitude']}")
        print(f"   {site['description'][:100]}...")
    
    # توليد مسار سياحي
    itinerary = recommender.generate_itinerary(days=2)
    
    # عرض المسار السياحي
    print("\nالمسار السياحي:")
    for day_index, day_sites in enumerate(itinerary):
        print(f"اليوم {day_index+1}:")
        for i, site in enumerate(day_sites):
            print(f"   {i+1}. {site['name']}")
            print(f"      الإحداثيات: {site['coordinates']['latitude']}, {site['coordinates']['longitude']}")
