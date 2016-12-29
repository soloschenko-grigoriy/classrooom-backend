import {iUserModel, User} from './modules/users/user-model';
import {UserController} from './modules/users/user-controller';
import {UserRepository} from './modules/users/user-repository';
      
import {iCourseModel, Course} from './modules/courses/course-model';
import {CourseController} from './modules/courses/course-controller';
import {CourseRepository} from './modules/courses/course-repository';
      
import {iLessonModel, Lesson} from './modules/lessons/lesson-model';
import {LessonController} from './modules/lessons/lesson-controller';
import {LessonRepository} from './modules/lessons/lesson-repository';
      
import {iQuestionModel, Question} from './modules/questions/question-model';
import {QuestionController} from './modules/questions/question-controller';
import {QuestionRepository} from './modules/questions/question-repository';
      
import {iScoreModel, Score} from './modules/scores/score-model';
import {ScoreController} from './modules/scores/score-controller';
import {ScoreRepository} from './modules/scores/score-repository';
      
import {iHomeworkModel, Homework} from './modules/homeworks/homework-model';
import {HomeworkController} from './modules/homeworks/homework-controller';
import {HomeworkRepository} from './modules/homeworks/homework-repository';
      
export class Boot{
  
	
	
	
	
	
	constructor(app){
		new HomeworkController(app, new HomeworkRepository(Homework));
		new ScoreController(app, new ScoreRepository(Score));
		new QuestionController(app, new QuestionRepository(Question));
		new LessonController(app, new LessonRepository(Lesson));
		new CourseController(app, new CourseRepository(Course));
		new UserController(app, new UserRepository(User));
  }
}