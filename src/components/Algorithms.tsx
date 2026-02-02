import { useTheme } from '../context/ThemeContext';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';

const Algorithms = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const algorithms = [
        {
            category: 'Arrays & Hashing',
            items: [
                {
                    title: 'Two Sum',
                    description: 'Find two numbers in an array that add up to a specific target. Uses a HashMap for O(n) efficiency.',
                    visualizerLink: '/array/problems',
                    gfgLink: 'https://www.geeksforgeeks.org/check-if-pair-with-given-sum-exists-in-array/',
                    difficulty: 'Easy',
                    color: 'text-emerald-500 bg-emerald-500/10'
                }
            ]
        },
        {
            category: 'Stack',
            items: [
                {
                    title: 'Valid Parentheses',
                    description: 'Determine if the input string has valid matching parentheses using a Stack data structure.',
                    visualizerLink: '/stack/problems',
                    gfgLink: 'https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/',
                    difficulty: 'Easy',
                    color: 'text-emerald-500 bg-emerald-500/10'
                }
            ]
        },
        {
            category: 'Queue',
            items: [
                {
                    title: 'Generate Binary Numbers',
                    description: 'Generate binary numbers from 1 to N using a Queue to systematically process sequences.',
                    visualizerLink: '/queue/problems',
                    gfgLink: 'https://www.geeksforgeeks.org/interesting-method-generate-binary-numbers-1-n/',
                    difficulty: 'Medium',
                    color: 'text-yellow-500 bg-yellow-500/10'
                }
            ]
        },
        {
            category: 'Linked List',
            items: [
                {
                    title: 'Floyd\'s Cycle Detection',
                    description: 'Detect if a linked list has a cycle using the Tortoise and Hare algorithm (two pointers).',
                    visualizerLink: '/linked-list/problems',
                    gfgLink: 'https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/',
                    difficulty: 'Medium',
                    color: 'text-yellow-500 bg-yellow-500/10'
                }
            ]
        },
        {
            category: 'Tree',
            items: [
                {
                    title: 'Tree Traversals (DFS)',
                    description: 'Explore Inorder, Preorder, and Postorder traversals on binary trees using depth-first search.',
                    visualizerLink: '/tree/problems',
                    gfgLink: 'https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/',
                    difficulty: 'Easy',
                    color: 'text-emerald-500 bg-emerald-500/10'
                },
                {
                    title: 'AVL Tree Rotations',
                    description: 'Self-balancing BST operations including left, right, left-right, and right-left rotations.',
                    visualizerLink: '/avl/rotations',
                    gfgLink: 'https://www.geeksforgeeks.org/avl-tree-set-1-insertion/',
                    difficulty: 'Hard',
                    color: 'text-red-500 bg-red-500/10'
                }
            ]
        },
        {
            category: 'Graph',
            items: [
                {
                    title: 'BFS Traversal',
                    description: 'Breadth-First Search explores nodes level by level using a Queue data structure.',
                    visualizerLink: '/traversals',
                    gfgLink: 'https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/',
                    difficulty: 'Medium',
                    color: 'text-yellow-500 bg-yellow-500/10'
                },
                {
                    title: 'DFS Traversal',
                    description: 'Depth-First Search explores as far as possible along each branch using a Stack.',
                    visualizerLink: '/traversals',
                    gfgLink: 'https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/',
                    difficulty: 'Medium',
                    color: 'text-yellow-500 bg-yellow-500/10'
                }
            ]
        }
    ];

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-deep-black text-platinum' : 'bg-gray-50 text-gray-900'}`}>
            <Navbar />

            <main className="max-w-7xl mx-auto px-8 py-12">
                <div className="text-center mb-16">
                    <h1 className={`text-5xl font-extrabold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Algorithm <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-500">Library</span>
                    </h1>
                    <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-platinum/60' : 'text-gray-600'}`}>
                        Comprehensive guide to Data Structures and Algorithms with interactive visualizations and resources.
                    </p>
                </div>

                <div className="space-y-12">
                    {algorithms.map((section, idx) => (
                        <div key={idx} className="space-y-6">
                            <h2 className={`text-3xl font-bold pl-4 border-l-4 border-sky-500 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                {section.category}
                            </h2>
                            <div className="flex flex-wrap justify-center gap-6">
                                {section.items.map((algo, i) => (
                                    <div key={i} className={`flex-1 min-w-[300px] max-w-xl p-6 rounded-2xl border transition-all hover:shadow-lg ${isDark
                                        ? 'bg-white/5 border-white/10 hover:border-sky-500/30'
                                        : 'bg-white border-gray-100 hover:border-sky-500/30 shadow-sm'}`}>

                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{algo.title}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${algo.color}`}>
                                                {algo.difficulty}
                                            </span>
                                        </div>

                                        <p className={`mb-6 leading-relaxed ${isDark ? 'text-platinum/70' : 'text-gray-600'}`}>
                                            {algo.description}
                                        </p>

                                        <div className="flex items-center gap-4">
                                            <Link
                                                to={algo.visualizerLink}
                                                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-bold text-center hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                            >
                                                Visualize <ArrowRight size={18} />
                                            </Link>
                                            <a
                                                href={algo.gfgLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`px-4 py-3 rounded-xl border font-bold transition-colors flex items-center justify-center gap-2 hover:bg-green-500/10 hover:text-green-600 hover:border-green-500/30 ${isDark
                                                    ? 'border-white/20 text-platinum'
                                                    : 'border-gray-200 text-gray-700'}`}
                                            >
                                                GeeksforGeeks <ExternalLink size={18} />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <footer className={`border-t px-8 py-12 text-center text-sm ${isDark ? 'border-white/10 text-platinum/40' : 'border-gray-200 text-gray-500'}`}>
                <p>&copy; 2026 StructLabs. Built for the future of DSA learning.</p>
            </footer>
        </div>
    );
};

export default Algorithms;
