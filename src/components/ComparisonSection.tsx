import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Scale, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const comparisonData = [
  {
    aspect: 'Loại thuật toán',
    mergeSort: 'Comparison-based (Dựa trên so sánh)',
    countingSort: 'Non-comparison (Phi so sánh)',
  },
  {
    aspect: 'Time Complexity',
    mergeSort: 'O(n log n)',
    countingSort: 'O(n + k)',
  },
  {
    aspect: 'Space Complexity',
    mergeSort: 'O(n)',
    countingSort: 'O(n + k)',
  },
  {
    aspect: 'Stable',
    mergeSort: 'Có ✓',
    countingSort: 'Có ✓',
  },
  {
    aspect: 'In-place',
    mergeSort: 'Không ✗',
    countingSort: 'Không ✗',
  },
  {
    aspect: 'Kiểu dữ liệu',
    mergeSort: 'Mọi kiểu có thể so sánh',
    countingSort: 'Chỉ số nguyên không âm',
  },
  {
    aspect: 'Phụ thuộc dữ liệu',
    mergeSort: 'Không (luôn O(n log n))',
    countingSort: 'Có (phụ thuộc k)',
  },
  {
    aspect: 'Song song hóa',
    mergeSort: 'Rất tốt',
    countingSort: 'Tốt',
  },
];

const useCases = [
  {
    title: 'Khi nào dùng Merge Sort?',
    icon: <CheckCircle2 className="w-5 h-5" />,
    color: 'primary',
    items: [
      'Sắp xếp linked list (hiệu quả nhất)',
      'Cần đảm bảo O(n log n) trong mọi trường hợp',
      'External sorting (dữ liệu lớn hơn RAM)',
      'Khi có thể sử dụng nhiều CPU/core',
      'Sắp xếp objects theo custom comparator',
    ],
  },
  {
    title: 'Khi nào dùng Counting Sort?',
    icon: <CheckCircle2 className="w-5 h-5" />,
    color: 'accent',
    items: [
      'Dữ liệu là số nguyên trong khoảng nhỏ',
      'Cần tốc độ O(n) thay vì O(n log n)',
      'Là bước con trong Radix Sort',
      'Histogram và phân tích thống kê',
      'Khi bộ nhớ không phải vấn đề',
    ],
  },
  {
    title: 'Khi nào KHÔNG nên dùng?',
    icon: <XCircle className="w-5 h-5" />,
    color: 'destructive',
    items: [
      'Merge Sort: Khi bộ nhớ rất hạn chế',
      'Merge Sort: Mảng nhỏ (< 50 phần tử)',
      'Counting Sort: Số thực, số âm lớn',
      'Counting Sort: Khoảng giá trị rất lớn',
      'Counting Sort: Kiểu dữ liệu không phải số',
    ],
  },
];

export default function ComparisonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="comparison" className="py-20 md:py-32 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-radial from-cyan/5 via-transparent to-transparent opacity-50 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <Scale className="inline w-10 h-10 mr-3 text-primary" />
            So sánh thuật toán
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hiểu rõ điểm mạnh và điểm yếu của mỗi thuật toán để lựa chọn phù hợp
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card overflow-hidden mb-16"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-4 font-semibold text-muted-foreground">Tiêu chí</th>
                  <th className="text-center p-4 font-semibold">
                    <span className="gradient-text">Merge Sort</span>
                  </th>
                  <th className="text-center p-4 font-semibold">
                    <span className="gradient-text-accent">Counting Sort</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <motion.tr
                    key={row.aspect}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="border-b border-border/30 hover:bg-secondary/30 transition-colors"
                  >
                    <td className="p-4 font-medium">{row.aspect}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                        row.mergeSort.includes('✓') 
                          ? 'bg-green/20 text-green' 
                          : row.mergeSort.includes('✗')
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-primary/20 text-primary'
                      }`}>
                        {row.mergeSort}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                        row.countingSort.includes('✓') 
                          ? 'bg-green/20 text-green' 
                          : row.countingSort.includes('✗')
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-accent/20 text-accent'
                      }`}>
                        {row.countingSort}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Use Cases */}
        <div className="grid md:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`glass-card p-6 ${
                useCase.color === 'primary' 
                  ? 'hover:border-primary/50' 
                  : useCase.color === 'accent'
                    ? 'hover:border-accent/50'
                    : 'hover:border-destructive/50'
              } transition-colors`}
            >
              <div className={`flex items-center gap-2 mb-4 ${
                useCase.color === 'primary' 
                  ? 'text-primary' 
                  : useCase.color === 'accent'
                    ? 'text-accent'
                    : 'text-destructive'
              }`}>
                {useCase.icon}
                <h3 className="font-semibold">{useCase.title}</h3>
              </div>
              <ul className="space-y-2">
                {useCase.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <AlertCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      useCase.color === 'primary' 
                        ? 'text-primary/60' 
                        : useCase.color === 'accent'
                          ? 'text-accent/60'
                          : 'text-destructive/60'
                    }`} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 glass-card p-6 md:p-8"
        >
          <h3 className="text-xl font-semibold mb-6 text-center">Biểu đồ so sánh hiệu năng (thời gian)</h3>
          <div className="h-64 flex items-end justify-center gap-8">
            {/* n = 1000 */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-2 items-end">
                <div className="w-12 bg-primary/80 rounded-t" style={{ height: '100px' }}>
                  <div className="text-xs text-center mt-1 text-primary-foreground">10</div>
                </div>
                <div className="w-12 bg-accent/80 rounded-t" style={{ height: '80px' }}>
                  <div className="text-xs text-center mt-1 text-white">8</div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">n = 1,000</div>
            </div>
            
            {/* n = 10000 */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-2 items-end">
                <div className="w-12 bg-primary/80 rounded-t" style={{ height: '140px' }}>
                  <div className="text-xs text-center mt-1 text-primary-foreground">130</div>
                </div>
                <div className="w-12 bg-accent/80 rounded-t" style={{ height: '90px' }}>
                  <div className="text-xs text-center mt-1 text-white">80</div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">n = 10,000</div>
            </div>
            
            {/* n = 100000 */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-2 items-end">
                <div className="w-12 bg-primary/80 rounded-t" style={{ height: '180px' }}>
                  <div className="text-xs text-center mt-1 text-primary-foreground">1600</div>
                </div>
                <div className="w-12 bg-accent/80 rounded-t" style={{ height: '100px' }}>
                  <div className="text-xs text-center mt-1 text-white">800</div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">n = 100,000</div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex justify-center gap-8 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-primary" />
              <span className="text-sm">Merge Sort</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-accent" />
              <span className="text-sm">Counting Sort (k ≈ n)</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            * Thời gian tính bằng microseconds (μs), giá trị minh họa
          </p>
        </motion.div>
      </div>
    </section>
  );
}
