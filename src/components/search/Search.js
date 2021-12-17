import React from 'react';
import SearchClass from './SearchClass.js';
import AddButtons from './AddButtons.js';
import CourseManager from '../../CourseManager.js';
import { SearchIcon, BookOpenIcon, ArrowRightIcon, SaveIcon, DotsHorizontalIcon } from '@heroicons/react/outline';

const SEARCH_RESULT_LIMIT = 100;
var shortcut = null;

function MiniContentBlock(props) {

    return (
        <div className="text-center p-4">
            <div className="mx-auto my-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
                {props.icon}
            </div>
            <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
                {props.title}
            </p>
            <p className="text-sm font-light text-gray-400 dark:text-gray-500">
                {props.text}
            </p>
        </div>
    )

}

class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            search: '',
            current: null,
            shortcut: null
        }

    }

    searchMessage(title, subtitle) {
        return (
            <div className="text-center text-gray-600 dark:text-gray-400 px-4">
                <p className="text-lg font-medium">
                    {title}
                </p>
                <p className="text-sm font-light">
                    {subtitle}
                </p>
            </div>
        )
    }

    getResults() {

        let search = this.state.search.toLowerCase();
        shortcut = null;

        if (search.length === 0) {
            return (
                <div>
                    <MiniContentBlock
                        icon={<SearchIcon className="w-6 h-6"/>}
                        title="Search"
                        text="Use the search bar to search across every undergraduate course at Northwestern."
                    />
                    <MiniContentBlock
                        icon={<BookOpenIcon className="w-6 h-6"/>}
                        title="Learn"
                        text="Get information like the course description, prerequisites, and more, all from right here. We'll help you make sure prereqs are met when you're adding courses, too."
                    />
                    <MiniContentBlock
                        icon={<ArrowRightIcon className="w-6 h-6"/>}
                        title="Drag"
                        text="Drag courses from this search area into the quarter you want. Alternatively, you can click on the course and select the quarter you want to add it to."
                    />
                    <MiniContentBlock
                        icon={<SaveIcon className="w-6 h-6"/>}
                        title="Save and share"
                        text="The URL updates as you modify your plan. Save it somewhere or share it with others."
                    />
                </div>
            )
        }

        search = search.replace(/-|_/g, ' ');

        let terms = [search];

        let firstWord = search.split(' ')[0];
        if (CourseManager.data.shortcuts[firstWord]) {
            let shortcuts = CourseManager.data.shortcuts[firstWord];
            let remainder = search.substring(firstWord.length + 1);
            terms = shortcuts.map(shortcut => {
                return shortcut.toLowerCase().replace(/-|_/, ' ') + ' ' + remainder;
            });

            shortcut = {
                replacing: firstWord,
                with: shortcuts.join(', ')
            }

        }

        for (let term of terms) {
            if (term.length < 3) {
                return this.searchMessage('Keep typing...', `You'll need at least 3 characters.`);
            }
        }

        let filtered = CourseManager.data.courses.filter(course => {
            for (let term of terms) {
                if (course.id.toLowerCase().replace(/-|_/g, ' ').includes(term)) return true;
                if (course.name.toLowerCase().includes(term)) return true;    
            }
            return false;
        });

        let courseList = [];
        let count = 0;
        for (let course of filtered) {
            courseList.push(
                <SearchClass color={CourseManager.getCourseColor(course.id)} course={course} key={course.id} select={classData => {
                    this.setState({current: classData});
                }}/>
            )
            count++;
            if (count >= SEARCH_RESULT_LIMIT) {
                courseList.push(
                    <MiniContentBlock
                        icon={<DotsHorizontalIcon className="w-6 h-6"/>}
                        title={`and ${filtered.length - count} more.`}
                        text="There are too many results to display. You'll need to narrow your search to get more."
                        key="too-many"/>
                )
                break;
            }
        }
        if (courseList.length === 0) {
            return this.searchMessage('Aw, no results.', `Try refining your search.`);
        }

        return courseList;

    }

    render() {

        let singleClassView = false;

        let results = this.getResults();

        let searchField = (
            <div className="sticky top-0 p-2 mb-2 bg-white dark:bg-gray-800 z-10 rounded-lg">
                <input className="block mt-4 mb-2 mx-auto w-11/12 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 shadow-md
                rounded-lg outline-none hover:border-gray-500 focus:border-black dark:hover:border-gray-400 dark:focus:border-white text-lg p-2 px-4
                transition-all duration-150 text-black dark:text-white" value={this.state.search} placeholder="Search for classes..." onChange={event => {
                    this.setState({search: event.target.value})
                }}/>
                {shortcut &&
                    <p className="text-center text-sm m-0 p-0 text-gray-500 dark:text-gray-400">
                        replacing <span className="text-black dark:text-white font-medium">{shortcut.replacing}</span> with <span className="text-black dark:text-white font-medium">{shortcut.with}</span>
                    </p>
                }
            </div>
        )
        
        let selectedClass = null;
        let addButtons = null;
        let exitButton = null;

        if (this.state.current) {
            singleClassView = true;

            selectedClass = (
                <SearchClass color={CourseManager.getCourseColor(this.state.current.id)} course={this.state.current}/>
            )

            addButtons = (
                    <AddButtons action={(year, quarter) => {
                        this.props.addCourse(this.state.current, year, quarter);
                        this.setState({current: null});
                    }} data={this.props.data}/>
            )
            exitButton = (
                <button className="block mx-auto bg-white dark:bg-gray-800 border-2 border-gray-400 text-gray-400
                w-2/3 p-2 my-4 hover:border-black hover:text-black dark:hover:border-gray-100 dark:hover:text-gray-100 transition-all duration-150 rounded-md" onClick={() => {
                    this.setState({current: null});
                }}>
                    Back
                </button>
            );
        }


        return (
            <div className="border-4 border-gray-400 dark:border-gray-500 mt-4 mb-2 rounded-lg shadow-lg h-full
            overflow-y-scroll overscroll-contain no-scrollbar">
                {!singleClassView && searchField}
                {!singleClassView && results}

                {singleClassView && selectedClass}
                {singleClassView && addButtons}
                {singleClassView && exitButton}
            </div>
        )
    }

}

export default Search;