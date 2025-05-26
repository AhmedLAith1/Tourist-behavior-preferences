"""
واجهة برمجة التطبيقات (API) لنظام تحليل تفضيلات السياح لآثار بابل

هذه الوحدة تنفذ واجهة برمجة تطبيقات RESTful باستخدام Flask لربط الواجهة الأمامية
مع نظام التوصية والوصول إلى قاعدة بيانات المواقع الأثرية.
"""

from flask import Flask, request, jsonify, render_template, send_from_directory
import os
import json
from .babylon_recommendation_system import BabylonRecommendationSystem
from .babylon_sites_database import BabylonSitesDatabase

# إنشاء تطبيق Flask
app = Flask(__name__, 
            static_folder='../frontend/static',
            template_folder='../frontend/templates')

# إنشاء نسخة من نظام التوصية وقاعدة البيانات
recommendation_system = BabylonRecommendationSystem()
sites_database = BabylonSitesDatabase()

@app.route('/')
def index():
    """عرض الصفحة الرئيسية"""
    return render_template('index.html')

@app.route('/questions', methods=['GET'])
def get_questions():
    """الحصول على أسئلة الاستبيان"""
    questions = recommendation_system.get_questions()
    return jsonify(questions)

@app.route('/sites', methods=['GET'])
def get_sites():
    """الحصول على جميع المواقع الأثرية"""
    sites = sites_database.get_all_sites()
    return jsonify(sites)

@app.route('/site/<int:site_id>', methods=['GET'])
def get_site(site_id):
    """الحصول على معلومات موقع أثري محدد"""
    site = sites_database.get_site_by_id(site_id)
    if site:
        return jsonify(site)
    else:
        return jsonify({"error": "الموقع غير موجود"}), 404

@app.route('/search', methods=['GET'])
def search_sites():
    """البحث عن المواقع الأثرية"""
    keyword = request.args.get('keyword', '')
    if not keyword:
        return jsonify({"error": "يجب تحديد كلمة البحث"}), 400
    
    results = sites_database.search_sites(keyword)
    return jsonify(results)

@app.route('/answer', methods=['POST'])
def submit_answer():
    """تقديم إجابة على سؤال"""
    data = request.json
    if not data or 'question_id' not in data or 'answer_index' not in data:
        return jsonify({"error": "البيانات غير كاملة"}), 400
    
    question_id = int(data['question_id'])
    answer_index = int(data['answer_index'])
    
    recommendation_system.set_user_answer(question_id, answer_index)
    return jsonify({"success": True})

@app.route('/answers', methods=['GET'])
def get_answers():
    """الحصول على جميع إجابات المستخدم"""
    answers = recommendation_system.get_user_answers()
    return jsonify(answers)

@app.route('/clear_answers', methods=['POST'])
def clear_answers():
    """مسح جميع إجابات المستخدم"""
    recommendation_system.clear_user_answers()
    return jsonify({"success": True})

@app.route('/recommendations', methods=['GET'])
def get_recommendations():
    """الحصول على التوصيات بناءً على إجابات المستخدم"""
    try:
        top_n = request.args.get('top_n', default=5, type=int)
        recommendations = recommendation_system.generate_recommendations(top_n=top_n)
        return jsonify(recommendations)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@app.route('/itinerary', methods=['GET'])
def get_itinerary():
    """الحصول على مسار سياحي"""
    days = request.args.get('days', default=1, type=int)
    itinerary = recommendation_system.generate_itinerary(days=days)
    
    # تحويل المسار إلى تنسيق JSON قابل للتسلسل
    serializable_itinerary = []
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
        
        serializable_itinerary.append(day_data)
    
    return jsonify(serializable_itinerary)

@app.route('/coordinates', methods=['GET'])
def get_coordinates():
    """الحصول على إحداثيات جميع المواقع الأثرية"""
    coordinates = sites_database.get_sites_coordinates()
    return jsonify(coordinates)

@app.route('/export/recommendations', methods=['GET'])
def export_recommendations():
    """تصدير التوصيات إلى تنسيق JSON"""
    data = recommendation_system.export_recommendations_to_json()
    if data:
        return jsonify(data)
    else:
        return jsonify({"error": "لا توجد توصيات متاحة"}), 404

@app.route('/export/itinerary', methods=['GET'])
def export_itinerary():
    """تصدير المسار السياحي إلى تنسيق JSON"""
    days = request.args.get('days', default=1, type=int)
    data = recommendation_system.export_itinerary_to_json(days=days)
    return jsonify(data)

@app.route('/images/<path:filename>')
def serve_image(filename):
    """خدمة ملفات الصور"""
    return send_from_directory(os.path.join(app.static_folder, 'images'), filename)

@app.errorhandler(404)
def page_not_found(e):
    """معالجة خطأ 404 (الصفحة غير موجودة)"""
    return render_template('404.html'), 404

@app.errorhandler(500)
def server_error(e):
    """معالجة خطأ 500 (خطأ في الخادم)"""
    return jsonify({"error": "حدث خطأ في الخادم"}), 500


# إذا تم تشغيل هذا الملف مباشرة
if __name__ == '__main__':
    # تشغيل التطبيق في وضع التطوير
    app.run(debug=True, host='0.0.0.0', port=5000)
