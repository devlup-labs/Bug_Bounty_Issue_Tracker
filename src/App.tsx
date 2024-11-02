import React, { useState } from 'react';
import { Bug, GitPullRequest, AlertCircle, ExternalLink, Code2, Cpu, CheckCircle } from 'lucide-react';

type Issue = {
    id: number;
    title: string;
    repo: string;
    issueNumber: number;
    category: string;
    techStack: string;
    status: 'Open' | 'In Progress' | 'Resolved';
    githubUrl: string;
};

function App() {
    const [techStackFilter, setTechStackFilter] = useState('All Tech Stacks');
    const [categoryFilter, setCategoryFilter] = useState('All Categories');

    const issues: Issue[] = [
        {
            id: 1,
            title: "Project Description field picks the URL instead",
            repo: "Devlup Labs Official Website (Portfolio)",
            issueNumber: 95,
            category: "Frontend",
            techStack: "JavaScript, Vue.js",
            status: "Open",
            githubUrl: "https://github.com/devlup-labs/devlup-labs.github.io/issues/95"
        },
        {
            id: 2,
            title: "Display User Profile Before Redirecting to Update Page",
            repo: "Winter of Code Website",
            issueNumber: 25,
            category: "Frontend",
            techStack: "TypeScript, React.js",
            status: "Open",
            githubUrl: "https://github.com/devlup-labs/Winter-of-Code-Website/issues/25"
        },
        {
            id: 3,
            title: "Admin Page: Input for setting max project count",
            repo: "Winter of Code Website",
            issueNumber: 26,
            category: "Frontend",
            techStack: "TypeScript, React.js",
            status: "Open",
            githubUrl: "https://github.com/devlup-labs/Winter-of-Code-Website/issues/26"
        },
        {
            id: 4,
            title: "API Routes for managing max project count",
            repo: "Winter of Code Website (Backend)",
            issueNumber: 12,
            category: "Backend",
            techStack: "Python, FastAPI",
            status: "Open",
            githubUrl: "https://github.com/devlup-labs/Devlup-woc-backend/issues/12"
        },
        {
            id: 5,
            title: "Currently, we do not support editing of already created alarms",
            repo: "Meet Scheduler",
            issueNumber: 92,
            category: "Frontend",
            techStack: "JavaScript",
            status: "In Progress",
            githubUrl: "https://github.com/devlup-labs/meet-scheduler/issues/92"
        },
        {
            id: 6,
            title: "More Repeat Options & Custom Alarm Edit",
            repo: "Meet Scheduler",
            issueNumber: 92,
            category: "Frontend",
            techStack: "JavaScript",
            status: "In Progress",
            githubUrl: "https://github.com/devlup-labs/meet-scheduler/issues/92"
        },
        {
            id: 7,
            title: "Incorrect about text on View Post Page",
            repo: "Travel Companion",
            issueNumber: 50,
            category: "Frontend",
            techStack: "Flutter, Firebase",
            status: "Open",
            githubUrl: "https://github.com/devlup-labs/travel_companion/issues/50"
        },
        {
            id: 8,
            title: "Inconsistent Time format on Create Post Page",
            repo: "Travel Companion",
            issueNumber: 51,
            category: "Frontend",
            techStack: "Flutter, Firebase",
            status: "Open",
            githubUrl: "https://github.com/devlup-labs/travel_companion/issues/51"
        }
    ];

    const filteredIssues = issues.filter(issue => {
        const matchesTechStack = techStackFilter === 'All Tech Stacks' || issue.techStack.includes(techStackFilter);
        const matchesCategory = categoryFilter === 'All Categories' || issue.category === categoryFilter;
        return matchesTechStack && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gray-900">
            <nav className="bg-gray-800 border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img
                            src="https://pbs.twimg.com/profile_images/1247951985896120320/Uh_nLgKS_400x400.jpg"
                            alt="Devlup Labs Logo"
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <span className="text-xl font-bold text-white">Bug Bounty Issues Tracker</span>
                            <div className="flex items-center text-sm text-gray-400">
                                <Code2 className="w-4 h-4 mr-1" />
                                by DevlUp Labs
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-4 sm:mb-0">Open Issues</h1>
                    <div className="flex space-x-4">
                        <select
                            className="bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-700"
                            value={techStackFilter}
                            onChange={(e) => setTechStackFilter(e.target.value)}
                        >
                            <option>All Tech Stacks</option>
                            <option>JavaScript</option>
                            <option>Vue.js</option>
                            <option>TypeScript</option>
                            <option>React.js</option>
                            <option>Python</option>
                            <option>FastAPI</option>
                            <option>Flutter</option>
                            <option>Firebase</option>
                        </select>
                        <select
                            className="bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-700"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option>All Categories</option>
                            <option>Frontend</option>
                            <option>Backend</option>
                        </select>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Issue
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Tech Stack
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    GitHub Link
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {filteredIssues.map((issue) => (
                                <tr key={issue.id} className="hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        #{issue.id}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-blue-400">
                                        <div>
                                            <div className="font-medium">{issue.title}</div>
                                            <div className="text-gray-400 text-xs">{issue.repo} #{issue.issueNumber}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {issue.category}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {issue.techStack}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm flex items-center">
                                        {issue.status === 'Open' && <Bug className="w-4 h-4 mr-1 text-green-400" />}
                                        {issue.status === 'In Progress' && <GitPullRequest className="w-4 h-4 mr-1 text-yellow-400" />}
                                        {issue.status === 'Resolved' && <CheckCircle className="w-4 h-4 mr-1 text-blue-500" />}
                                        <span className="text-white">{issue.status}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        <a href={issue.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-400">
                                            <ExternalLink className="w-4 h-4 mr-1" />
                                            View
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default App;
