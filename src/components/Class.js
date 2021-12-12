import React from "react";
import { DragSource } from 'react-dnd';
import CourseManager from '../CourseManager.js';
import { InformationCircleIcon, TrashIcon, DocumentIcon } from '@heroicons/react/outline';

const classSource = {

    beginDrag(props, monitor, component) {
        const item = {
            course: props.course,
            from: {
                year: props.yi,
                quarter: props.qi
            }
        }
        return item;
    }
  
  }
  
function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class Class extends React.Component {

    openInfo() {
        let course = this.props.course;
        let color = CourseManager.getCourseColor(course.id);
        this.props.alert({
            title: course.id,
            subtitle: course.name,
            message: course.description,
            confirmButton: 'Close',
            confirmButtonColor: color,
            iconBackgroundColor: color,
            icon: (<DocumentIcon className={`h-6 w-6 text-${color}-600`} aria-hidden="true" />)
        })
    }

    render() {

        let course = this.props.course;
        let color = CourseManager.getCourseColor(course.id);

        const { isDragging, connectDragSource } = this.props;

        return connectDragSource(
            <div className={`p-2 rounded-lg bg-opacity-60 bg-${color}-100
            border-2 border-${color}-300 border-opacity-60 overflow-hidden whitespace-nowrap
            hover:shadow-md transition ease-in-out duration-300 transform hover:-translate-y-1 group ${isDragging ? 'cursor-grab' : 'cursor-default'}
            compact:px-2 compact:py-0.5`}>
                <p className="text-md font-bold compact:text-sm">
                    {course.id}
                </p>
                <p className="text-xs overflow-hidden w-full block whitespace-nowrap overflow-ellipsis compact:hidden" title={course.name}>
                    {course.name}
                </p>
                <div className="absolute top-3 bottom-3 compact:top-0.5 compact:bottom-0.5 right-1 px-2 flex flex-row gap-2">
                    <button className="text-gray-800 text-xs opacity-20 hover:text-blue-500 hover:opacity-100
                    transition-all duration-150 hidden group-hover:block" onClick={() => {
                        this.openInfo();
                    }}>
                        <InformationCircleIcon className="w-6 h-6 compact:w-5 compact:h-5"/>
                        
                    </button>
                    <button className="text-gray-800 text-xs opacity-20 hover:text-red-500 hover:opacity-100
                    transition-all duration-150 hidden group-hover:block" onClick={() => {
                        this.props.delCourse();
                    }}>
                        <TrashIcon className="w-6 h-6 compact:w-5 compact:h-5"/>
                        
                    </button>
                </div>
                
            </div>
        );
    }
}

export default DragSource('Class', classSource, collect)(Class);