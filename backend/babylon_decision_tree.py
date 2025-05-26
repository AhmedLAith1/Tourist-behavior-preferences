

import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import OneHotEncoder
import json
import os
class BabylonDecisionTree:
    
    def __init__(self):
        self.model = None
        self.encoder = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
        self.features = []
        self.site_ids = []
        self.questions = []
        self.trained = False
    
    def prepare_training_data(self, questions, sites):
        self.questions = questions
        self.site_ids = [site["id"] for site in sites]
        
        X = []
        y = []
        
        for site in sites:
            site_type = site["type"]
            period = site["period"]
            duration = site["visit_duration"]
            popularity = site["popularity"]
            accessibility = site["accessibility"]
            entrance_fee = site["entrance_fee"]
            
            if "معبد" in site_type:
                type_pref = 0  
            elif "قصر" in site_type:
                type_pref = 1  
            elif "سور" in site_type or "بوابة" in site_type:
                type_pref = 2  
            elif "متحف" in site_type or "مركز" in site_type:
                type_pref = 3  
            else:
                type_pref = 4  # تفضيل أنواع أخرى
            
            # الفترة 
            if "القديم" in period and "الحديث" not in period:
                period_pref = 0  
            elif "الحديث" in period and "القديم" not in period:
                period_pref = 1  
            elif "القديم" in period and "الحديث" in period:
                period_pref = 2  
            else:
                period_pref = 3 # اخرى 
            
            # مدة الزيارة
            if duration <= 30:
                duration_pref = 0  
            elif duration <= 60:
                duration_pref = 1 
            elif duration <= 120:
                duration_pref = 2 
            else:
                duration_pref = 3  # تفضيل زيارات طويلة جداً
            
            # الشعبية
            if popularity >= 9.0:
                popularity_pref = 0  
            elif popularity >= 8.0:
                popularity_pref = 1  
            elif popularity >= 7.0:
                popularity_pref = 2  
            else:
                popularity_pref = 3  # تفضيل المواقع الأقل شهرة
            
            # سهولة الوصول
            if accessibility >= 9.0:
                accessibility_pref = 0  
            elif accessibility >= 8.0:
                accessibility_pref = 1  
            elif accessibility >= 7.0:
                accessibility_pref = 2  
            else:
                accessibility_pref = 3  # تفضيل المواقع الأقل سهولة في الوصول
            
            # رسوم الدخول
            if entrance_fee == 0:
                fee_pref = 0  
            elif entrance_fee <= 5:
                fee_pref = 1  
            elif entrance_fee <= 10:
                fee_pref = 2  
            else:
                fee_pref = 3  # تفضيل المواقع مرتفعة التكلفة
            
            for i in range(3):  
                type_var = type_pref
                period_var = period_pref
                duration_var = min(3, max(0, duration_pref + np.random.randint(-1, 2)))
                popularity_var = min(3, max(0, popularity_pref + np.random.randint(-1, 2)))
                accessibility_var = min(3, max(0, accessibility_pref + np.random.randint(-1, 2)))
                fee_var = min(3, max(0, fee_pref + np.random.randint(-1, 2)))
                
                X.append([type_var, period_var, duration_var, popularity_var, accessibility_var, fee_var])
                y.append(site["id"])
        
        X = np.array(X)
        y = np.array(y)
        
        # self.encoder.fit(X)
        # X_encoded = self.encoder.transform(X)
        
        return X, y
    
    def train(self, questions, sites):
        X, y = self.prepare_training_data(questions, sites)
        
        self.model = DecisionTreeClassifier(max_depth=5, random_state=42)
        self.model.fit(X, y)
        
        accuracy = self.model.score(X, y)
        self.trained = True
        os.makedirs("models", exist_ok=True)
        self.save_model("models/babylon_tree_model.pkl")
        return accuracy
    
    def predict(self, user_answers):
        if not self.trained or self.model is None:
            raise ValueError("يجب تدريب النموذج أولاً باستخدام طريقة train()")
        
        features = []
        for q_id, answer_idx in user_answers.items():
            features.append(answer_idx)
        
        while len(features) < 6:
            features.append(0)  # إضافة قيم افتراضية إذا كانت الإجابات غير مكتملة
        
        features = np.array(features).reshape(1, -1)
        
        site_id = self.model.predict(features)[0]
        
        probabilities = self.model.predict_proba(features)[0]
        
        return site_id, probabilities.tolist()
    
    def get_feature_importance(self):
        if not self.trained or self.model is None:
            raise ValueError("يجب تدريب النموذج أولاً باستخدام طريقة train()")
        
        importance = self.model.feature_importances_
        
        feature_names = ["نوع الموقع", "الفترة التاريخية", "مدة الزيارة", "الشعبية", "سهولة الوصول", "رسوم الدخول"]
        importance_dict = {feature_names[i]: float(importance[i]) for i in range(len(feature_names))}
        
        return importance_dict
    
    def save_model(self, filename):
        if not self.trained or self.model is None:
            raise ValueError("يجب تدريب النموذج أولاً باستخدام طريقة train()")
        
        import pickle
        with open(filename, 'wb') as f:
            pickle.dump(self.model, f)
    
    def load_model(self, filename):
        import pickle
        with open(filename, 'rb') as f:
            self.model = pickle.load(f)
        self.trained = True


if __name__ == "__main__":
    from babylon_sites_database import BabylonSitesDatabase
    
    db = BabylonSitesDatabase()
    sites = db.get_all_sites()
    
    questions = [
        {"id": 1, "text": "ما هو نوع الآثار المفضل لديك؟", "options": ["المعابد", "القصور", "الأسوار والبوابات", "المتاحف", "أخرى"]},
        {"id": 2, "text": "ما هي الفترة التاريخية المفضلة لديك؟", "options": ["العصر البابلي القديم", "العصر البابلي الحديث", "كلاهما", "لا يهم"]},
        {"id": 3, "text": "ما هي مدة الزيارة المفضلة لديك؟", "options": ["قصيرة (أقل من 30 دقيقة)", "متوسطة (30-60 دقيقة)", "طويلة (1-2 ساعة)", "طويلة جداً (أكثر من ساعتين)"]},
        {"id": 4, "text": "هل تفضل المواقع الأثرية الشهيرة أم الأقل شهرة؟", "options": ["الشهيرة جداً", "الشهيرة", "متوسطة الشهرة", "الأقل شهرة"]},
        {"id": 5, "text": "ما مدى أهمية سهولة الوصول إلى الموقع بالنسبة لك؟", "options": ["مهم جداً", "مهم", "متوسط الأهمية", "غير مهم"]},
        {"id": 6, "text": "ما هي رسوم الدخول المفضلة لديك؟", "options": ["مجاني", "منخفضة (1-5 دولار)", "متوسطة (6-10 دولار)", "مرتفعة (أكثر من 10 دولار)"]}
    ]
    
    dt = BabylonDecisionTree()
    accuracy = dt.train(questions, sites)
    print(f"دقة النموذج: {accuracy:.2f}")
    
    user_answers = {1: 0, 2: 1, 3: 2, 4: 0, 5: 1, 6: 2}  # إجابات افتراضية
    site_id, probabilities = dt.predict(user_answers)

    site = db.get_site_by_id(site_id)
    print(f"\nالموقع الأثري المقترح: {site['name']}")
    print(f"الوصف: {site['description']}")

    importance = dt.get_feature_importance()
    print("\nأهمية كل عامل في التوصية:")
    for feature, imp in importance.items():
        print(f"{feature}: {imp:.4f}")
