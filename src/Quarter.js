import React from 'react';
import Class from './Class.js';
import Utility from './Utility.js';

class Quarter extends React.Component {

    render() {

        let content = this.props.content;
        let classes = [];
        if (content) {
            if (content.length > 0) {
                classes = content.map((classData, index) => {
                    return <Class id={classData.id} name={classData.name} color={Utility.getCourseColor(classData.id)} key={index}
                    delClass={() => {
                        this.props.delClass(index);
                    }}/>
                })
            } else {
                classes = (
                    <div className={`p-2 rounded-lg bg-white border-2 border-dashed border-black
                    overflow-hidden whitespace-nowrap opacity-40`}>
                        <p className="text-md font-bold">
                            No classes to show.
                        </p>
                        <p className="text-xs">
                            Use the search bar.
                        </p>
                    </div>
                )
            }

        }

        return (
            <div className={`block bg-${this.props.color}-50 rounded-lg px-8 pt-4 pb-8 border-2 border-${this.props.color}-400 space-y-3 h-full shadow-lg`}>
                <p className="text-center font-bold text-md m-0 p-0 text-gray-600">
                    {this.props.title}
                </p>
                {classes}
            </div>
        );
    }

}

export default Quarter;