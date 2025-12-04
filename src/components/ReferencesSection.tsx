import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, ExternalLink, FileText, Video, Globe } from 'lucide-react';

const references = [
  {
    category: 'Sách tham khảo',
    icon: <BookOpen className="w-5 h-5" />,
    items: [
      {
        title: 'Introduction to Algorithms (CLRS)',
        author: 'Cormen, Leiserson, Rivest, Stein',
        description: 'Sách kinh điển về thuật toán, Chapter 2 & 8',
        url: 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/',
      },
      {
        title: 'The Art of Computer Programming, Vol. 3',
        author: 'Donald E. Knuth',
        description: 'Phân tích chi tiết các thuật toán sắp xếp',
        url: 'https://www-cs-faculty.stanford.edu/~knuth/taocp.html',
      },
      {
        title: 'Algorithms, 4th Edition',
        author: 'Robert Sedgewick, Kevin Wayne',
        description: 'Hướng dẫn thực hành với Java',
        url: 'https://algs4.cs.princeton.edu/home/',
      },
    ],
  },
  {
    category: 'Bài báo khoa học',
    icon: <FileText className="w-5 h-5" />,
    items: [
      {
        title: 'First Draft of a Report on the EDVAC',
        author: 'John von Neumann (1945)',
        description: 'Báo cáo gốc mô tả Merge Sort',
        url: 'https://en.wikipedia.org/wiki/First_Draft_of_a_Report_on_the_EDVAC',
      },
      {
        title: 'Internal Sorting Methods',
        author: 'Harold H. Seward (1954)',
        description: 'MIT Thesis giới thiệu Counting Sort',
        url: 'https://dspace.mit.edu/',
      },
    ],
  },
  {
    category: 'Tài nguyên trực tuyến',
    icon: <Globe className="w-5 h-5" />,
    items: [
      {
        title: 'GeeksforGeeks - Sorting Algorithms',
        author: 'GeeksforGeeks',
        description: 'Tutorials và code examples',
        url: 'https://www.geeksforgeeks.org/sorting-algorithms/',
      },
      {
        title: 'Visualgo - Sorting Visualization',
        author: 'NUS Singapore',
        description: 'Minh họa trực quan các thuật toán',
        url: 'https://visualgo.net/en/sorting',
      },
      {
        title: 'Big-O Cheat Sheet',
        author: 'Eric Rowell',
        description: 'So sánh độ phức tạp các thuật toán',
        url: 'https://www.bigocheatsheet.com/',
      },
    ],
  },
  {
    category: 'Video hướng dẫn',
    icon: <Video className="w-5 h-5" />,
    items: [
      {
        title: 'MIT OpenCourseWare - Algorithms',
        author: 'MIT',
        description: 'Khóa học 6.006 Introduction to Algorithms',
        url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
      },
      {
        title: 'CS50 - Sorting Algorithms',
        author: 'Harvard University',
        description: 'Giải thích dễ hiểu cho người mới',
        url: 'https://cs50.harvard.edu/x/',
      },
    ],
  },
];

export default function ReferencesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="references" className="py-20 md:py-32 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <BookOpen className="inline w-10 h-10 mr-3 text-primary" />
            Tài liệu tham khảo
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nguồn tài liệu đáng tin cậy để tìm hiểu sâu hơn về thuật toán
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {references.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: catIndex * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-3 mb-6 text-primary">
                {category.icon}
                <h3 className="text-xl font-semibold">{category.category}</h3>
              </div>
              
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <motion.a
                    key={item.title}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: catIndex * 0.1 + itemIndex * 0.05 + 0.2 }}
                    className="block p-4 rounded-lg bg-secondary/30 border border-border/30 hover:border-primary/50 hover:bg-secondary/50 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-medium group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">{item.author}</p>
                        <p className="text-xs text-muted-foreground/70 mt-2">{item.description}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="glass-card inline-block px-8 py-4">
            <p className="text-muted-foreground">
              Bài thuyết trình về <span className="text-primary font-medium">Merge Sort</span> và{' '}
              <span className="text-accent font-medium">Counting Sort</span>
            </p>
            <p className="text-sm text-muted-foreground/70 mt-2">
              Ngôn ngữ lập trình: C | Môn học: Cấu trúc dữ liệu và Giải thuật
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
