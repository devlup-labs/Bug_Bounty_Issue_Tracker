import React, { useState, useEffect } from 'react';
import { Bug, GitPullRequest, ExternalLink, CheckCircle } from 'lucide-react';

const googleSheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;

type Issue = {
    id: number;
    title: string;
    issueNumber: number;
    ProjectLink: string;
    techStack: string;
    status: 'Open' | 'In Progress' | 'Resolved';
    githubUrl: string;
};

// Navbar Component
function NavBar() {
    return (
        <nav className="bg-gray-800 p-4 shadow-md">
            <div className="max-w-7xl mx-auto flex items-start space-x-3">
                {/* Logo and Titles */}
                <img 
                    src="https://pbs.twimg.com/profile_images/1247951985896120320/Uh_nLgKS_400x400.jpg" 
                    alt="Logo"
                    className="w-10 h-10 rounded-full"
                />
                <div>
                    <h1 className="text-xl font-semibold text-white">Bug Bounty Issues Tracker</h1>
                    <p className="text-sm text-gray-400">&lt;/&gt; by DevlUp Labs</p>
                </div>
            </div>
        </nav>
    );
}

function App() {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [techStacks, setTechStacks] = useState<string[]>([]);
    const [techStackFilter, setTechStackFilter] = useState('All Tech Stacks');

    useEffect(() => {
        const fetchIssues = async () => {
            const response = await fetch(googleSheetsUrl);
            const data = await response.text();
            const json = JSON.parse(data.substring(47).slice(0, -2)); // Extract JSON data from the response
            const rows = json.table.rows;

            const fetchedIssues: Issue[] = rows.map((row: any, index: number) => {
                return {
                    id: index + 1,
                    title: row.c[7]?.v || 'No title',
                    issueNumber: row.c[2]?.v || 0,
                    ProjectLink: row.c[2]?.v || 'No ProjectLink',
                    techStack: row.c[5]?.v || 'No tech stack',
                    status: 'Open',
                    githubUrl: row.c[6]?.v || '#',
                };
            });

            setIssues(fetchedIssues);

            const uniqueTechStacks = Array.from(new Set(
                fetchedIssues.flatMap(issue => 
                    issue.techStack.split(',').map(stack => stack.trim())
                )
            ));
            setTechStacks(['All Tech Stacks', ...uniqueTechStacks]);
        };

        fetchIssues();
    }, []);

    const filteredIssues = issues.filter(issue => {
        const matchesTechStack = techStackFilter === 'All Tech Stacks' || issue.techStack.split(',').map(stack => stack.trim()).includes(techStackFilter);
        return matchesTechStack;
    });

    return (
        <div className="min-h-screen bg-gray-900">
            <NavBar />

            {/* Open Issues and Tech Stack Filter */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-white">Open Issues</h2>
                
                {/* Tech Stack Filter on the right side */}
                <select
                    value={techStackFilter}
                    onChange={(e) => setTechStackFilter(e.target.value)}
                    className="bg-gray-800 text-gray-300 rounded px-4 py-2"
                >
                    {techStacks.map((stack) => (
                        <option key={stack} value={stack}>
                            {stack}
                        </option>
                    ))}
                </select>
            </div>

            {/* Issues Table */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-gray-800 rounded-lg overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Issue</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Project Link</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tech Stack</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Issue Link</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {filteredIssues.map((issue) => (
                                <tr key={issue.id} className="hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">#{issue.id}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-blue-400">
                                        <div>
                                            <div className="font-medium">{issue.title}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        <a href={issue.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-400">
                                            <ExternalLink className="w-4 h-4 mr-1" />
                                            {issue.ProjectLink}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{issue.techStack}</td>
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
            </div>
        </div>
    );
}

export default App;
