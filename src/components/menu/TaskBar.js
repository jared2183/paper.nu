import React from 'react';
import Utility from '../../Utility.js';
import {
    ExternalLinkIcon,
    InformationCircleIcon,
    CogIcon,
    SearchIcon,
    BookmarkIcon,
    CollectionIcon,
} from '@heroicons/react/outline';

function MiniButton(props) {
    return (
        <button
            className={`p-1 border-2 border-gray-400 dark:border-gray-500 rounded-lg text-gray-500 dark:text-gray-300
                hover:border-${props.color}-500 dark:hover:border-${props.color}-500 hover:bg-${props.color}-50 dark:hover:bg-gray-800
                hover:text-${props.color}-500 dark:hover:text-${props.color}-400 transition-all duration-150`}
            onClick={() => {
                props.action();
            }}
        >
            <props.icon className="w-5 h-5" />
        </button>
    );
}

const TabBarButtonColors = {
    Search: 'gray',
    'My List': 'indigo',
    Plans: 'rose',
};

function TabBarButton(props) {
    return (
        <button
            className={`px-2 py-1 ${
                props.name === props.selected
                    ? `bg-${props.color}-400 dark:bg-${props.color}-500 text-white`
                    : `bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300
                    hover:bg-${props.color}-100 hover:text-${props.color}-600 dark:hover:text-${props.color}-400
                    transition-all duration-150`
            } flex items-center gap-1`}
            onClick={() => {
                props.setSwitch('tab', props.name);
            }}
        >
            {props.content}
        </button>
    );
}

function TabBar(props) {
    let color = TabBarButtonColors[props.switches.tab];
    return (
        <div
            className={`flex border-2 border-${color}-400 dark:border-${color}-500 rounded-lg overflow-hidden bg-${color}-400 dark:bg-${color}-500`}
        >
            <TabBarButton
                name="Search"
                selected={props.switches.tab}
                setSwitch={props.setSwitch}
                color={TabBarButtonColors['Search']}
                content={<SearchIcon className="w-5 h-5" />}
            />
            <TabBarButton
                name="My List"
                selected={props.switches.tab}
                setSwitch={props.setSwitch}
                color={TabBarButtonColors['My List']}
                content={<BookmarkIcon className="w-5 h-5" />}
            />
            <TabBarButton
                name="Plans"
                selected={props.switches.tab}
                setSwitch={props.setSwitch}
                color={TabBarButtonColors['Plans']}
                content={
                    <>
                        <CollectionIcon className="w-5 h-5" />
                        <p className="lg:hidden xl:block m-0 text-sm lg:text-xs w-20 lg:w-12 overflow-hidden whitespace-nowrap text-ellipsis">
                            Log in
                        </p>
                    </>
                }
            />
        </div>
    );
}

function TaskBar(props) {
    return (
        <div className="flex mx-auto mt-2 mb-4 gap-2">
            <MiniButton
                icon={InformationCircleIcon}
                color="purple"
                action={() => {
                    props.alert({
                        title: 'Plan Northwestern',
                        customSubtitle: (
                            <p className="text-md font-light text-gray-500 dark:text-gray-400">
                                version {props.version} by{' '}
                                <a
                                    className="text-purple-500 dark:text-purple-300 opacity-100 hover:opacity-60 transition-all duration-150"
                                    href="https://dilanxd.com"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Dilan N
                                </a>
                            </p>
                        ),
                        message:
                            'An easy and organized way to plan out your classes at Northwestern. Data is all saved in the URL, so save the link to your plan to access it later or share with friends.',
                        confirmButton: 'View on GitHub',
                        confirmButtonColor: 'purple',
                        cancelButton: 'Close',
                        iconBackgroundColor: 'purple',
                        icon: (
                            <InformationCircleIcon
                                className="h-6 w-6 text-purple-600"
                                aria-hidden="true"
                            />
                        ),
                        action: () => {
                            window.open(
                                'https://github.com/dilanx/plan-northwestern',
                                '_blank'
                            );
                        },
                        options: [
                            {
                                name: 'about_change_log',
                                title: `What's new?`,
                                description: `Check out what changes have been made in the latest update.`,
                                buttonTextOn: `View the change log`,
                                singleAction: () => {
                                    window.open(
                                        'https://github.com/dilanx/plan-northwestern/blob/main/CHANGELOG.md',
                                        '_blank'
                                    );
                                },
                            },
                            {
                                name: 'about_coming_soon',
                                title: 'Coming soon',
                                description: `Check out what's been requested and what I'm working on on the GitHub issues page. Check this out before you send feedback in case someone else has already requested it.`,
                                buttonTextOn: `See what's coming`,
                                singleAction: () => {
                                    window.open(
                                        'https://github.com/dilanx/plan-northwestern/issues?q=',
                                        '_blank'
                                    );
                                },
                            },
                            {
                                name: 'about_feedback',
                                title: 'Share your thoughts!',
                                description: `Find any bugs, notice any errors in course data, or have any suggestions? Let me know! I'm always interested in making the site better.`,
                                buttonTextOn: 'Leave feedback',
                                singleAction: () => {
                                    window.open(
                                        'https://github.com/dilanx/plan-northwestern/blob/main/FEEDBACK.md',
                                        '_blank'
                                    );
                                },
                            },
                        ],
                    });
                }}
            />
            <MiniButton
                icon={ExternalLinkIcon}
                color="green"
                action={() => {
                    props.alert({
                        title: 'Ready to share!',
                        message:
                            'All of your plan data is stored in the URL. When you make changes to your plan, the URL is updated to reflect those changes. Save it somewhere, or share with a friend!',
                        confirmButton: 'Copy to clipboard',
                        confirmButtonColor: 'emerald',
                        cancelButton: 'Close',
                        iconBackgroundColor: 'emerald',
                        icon: (
                            <ExternalLinkIcon
                                className="h-6 w-6 text-emerald-600"
                                aria-hidden="true"
                            />
                        ),
                        textView: window.location.href,
                        action: () => {
                            navigator.clipboard.writeText(window.location.href);
                        },
                    });
                }}
            />
            <MiniButton
                icon={CogIcon}
                color="yellow"
                action={() => {
                    props.alert({
                        title: 'Settings',
                        message: `Customize your Plan Northwestern experience! These settings are saved in your browser and not in the URL.`,
                        confirmButton: 'Close',
                        confirmButtonColor: 'yellow',
                        iconBackgroundColor: 'yellow',
                        icon: (
                            <CogIcon
                                className="h-6 w-6 text-yellow-600"
                                aria-hidden="true"
                            />
                        ),
                        switches: props.switches,
                        setSwitch: props.setSwitch,
                        options: [
                            {
                                name: 'dark',
                                title: 'Dark mode',
                                description: `Become one with the night.`,
                                buttonTextOn: 'Enabled',
                                buttonTextOff: 'Disabled',
                                saveToStorage: true,
                                bonusAction: newSwitch => {
                                    let color = newSwitch
                                        ? Utility.BACKGROUND_DARK
                                        : Utility.BACKGROUND_LIGHT;
                                    document.body.style.backgroundColor = color;
                                    document
                                        .querySelector(
                                            'meta[name="theme-color"]'
                                        )
                                        .setAttribute('content', color);
                                },
                            },
                            {
                                name: 'compact',
                                title: 'Compact mode',
                                description: `It's a bit uglier I think, but you can view more on the screen at once without needing to scroll.`,
                                buttonTextOn: 'Enabled',
                                buttonTextOff: 'Disabled',
                                saveToStorage: true,
                            },
                            {
                                name: 'quarter_units',
                                title: 'Show units per quarter',
                                description:
                                    'Reveal the unit count per quarter.',
                                buttonTextOn: 'Enabled',
                                buttonTextOff: 'Disabled',
                                saveToStorage: true,
                            },
                            {
                                name: 'more_info',
                                title: 'Show more info on classes',
                                description: `See prerequisites and distribution areas on the class items without having to click on their info button. The info won't display if compact mode is enabled.`,
                                buttonTextOn: 'Enabled',
                                buttonTextOff: 'Disabled',
                                saveToStorage: true,
                            },
                            {
                                name: 'save_to_storage',
                                title: 'Remember most recent plan',
                                description: `If you visit this site without a full plan URL, your most recently modified plan will be loaded.`,
                                buttonTextOn: 'Enabled',
                                buttonTextOff: 'Disabled',
                                saveToStorage: true,
                            },
                            {
                                name: 'clear_plan',
                                title: 'Clear plan',
                                description: `Clear all of your current plan data, which includes everything for each year and everything in My List. Make sure to save the current URL somewhere if you don't want to lose it.`,
                                buttonTextOn: 'Clear',
                                requireConfirmation: true,
                                singleAction: () => {
                                    props.clearData();
                                },
                            },
                        ],
                    });
                }}
            />
            <TabBar switches={props.switches} setSwitch={props.setSwitch} />
        </div>
    );
}

export default TaskBar;
