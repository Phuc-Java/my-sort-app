import { AlgorithmSection, InfoCard, TimelineItem, AlgorithmStep, SectionIcons } from './AlgorithmSection';
import CodeBlock from './CodeBlock';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GitMerge, Layers, Zap, Building2, Database, Globe } from 'lucide-react';

const mergeSortCode = `#include <stdio.h>
#include <stdlib.h>

// Hàm trộn hai mảng con đã sắp xếp
void merge(int arr[], int left, int mid, int right) {
    int i, j, k;
    int n1 = mid - left + 1;  // Kích thước mảng con trái
    int n2 = right - mid;      // Kích thước mảng con phải
    
    // Tạo mảng tạm
    int *L = (int*)malloc(n1 * sizeof(int));
    int *R = (int*)malloc(n2 * sizeof(int));
    
    // Sao chép dữ liệu vào mảng tạm
    for (i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];
    
    // Trộn hai mảng tạm lại thành arr[left..right]
    i = 0;    // Chỉ số mảng con trái
    j = 0;    // Chỉ số mảng con phải
    k = left; // Chỉ số mảng kết quả
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    // Sao chép phần tử còn lại của mảng L (nếu có)
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    
    // Sao chép phần tử còn lại của mảng R (nếu có)
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
    
    // Giải phóng bộ nhớ
    free(L);
    free(R);
}

// Hàm Merge Sort đệ quy
void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        // Tìm điểm giữa để chia mảng thành 2 phần
        int mid = left + (right - left) / 2;
        
        // Sắp xếp nửa đầu và nửa sau
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        
        // Trộn hai nửa đã sắp xếp
        merge(arr, left, mid, right);
    }
}

// Hàm in mảng
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++)
        printf("%d ", arr[i]);
    printf("\\n");
}

// Hàm main để test
int main() {
    int arr[] = {38, 27, 43, 3, 9, 82, 10};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Mảng ban đầu: ");
    printArray(arr, n);
    
    mergeSort(arr, 0, n - 1);
    
    printf("Mảng sau khi sắp xếp: ");
    printArray(arr, n);
    
    return 0;
}`;

const timeline = [
  { year: '1945', title: 'John von Neumann phát minh', description: 'Merge Sort được phát minh bởi John von Neumann trong quá trình làm việc với máy tính EDVAC.' },
  { year: '1948', title: 'Công bố chính thức', description: 'Thuật toán được mô tả chi tiết trong báo cáo về EDVAC và trở thành một trong những thuật toán sắp xếp đầu tiên được phân tích.' },
  { year: '1969', title: 'Natural Merge Sort', description: 'Phiên bản tận dụng các dãy con đã sắp xếp sẵn trong dữ liệu đầu vào.' },
  { year: '2002', title: 'Timsort ra đời', description: 'Tim Peters kết hợp Merge Sort với Insertion Sort tạo ra Timsort, được dùng trong Python và Java.' },
];

const applications = [
  { icon: <Database className="w-5 h-5" />, title: 'Hệ thống Database', desc: 'External sorting cho dữ liệu lớn hơn RAM' },
  { icon: <Globe className="w-5 h-5" />, title: 'E-commerce', desc: 'Sắp xếp sản phẩm theo nhiều tiêu chí' },
  { icon: <Building2 className="w-5 h-5" />, title: 'Linked Lists', desc: 'Thuật toán tối ưu cho danh sách liên kết' },
  { icon: <Layers className="w-5 h-5" />, title: 'Parallel Computing', desc: 'Dễ dàng song song hóa trên nhiều CPU' },
];

export default function MergeSortSection() {
  const visualRef = useRef(null);
  const isVisualInView = useInView(visualRef, { once: true, margin: '-100px' });

  return (
    <AlgorithmSection id="merge-sort" title="Merge Sort" gradient="primary">
      {/* History Section */}
      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        <InfoCard icon={<SectionIcons.History className="w-5 h-5" />} title="Lịch sử phát triển">
          <p className="mb-4">
            <strong className="text-foreground">Merge Sort</strong> được phát minh bởi{' '}
            <span className="text-primary">John von Neumann</span> vào năm 1945, 
            là một trong những thuật toán sắp xếp lâu đời nhất vẫn còn được sử dụng rộng rãi.
          </p>
          <p>
            Thuật toán dựa trên nguyên lý <em className="text-primary">"Chia để trị"</em> (Divide and Conquer), 
            chia mảng thành các phần nhỏ hơn, sắp xếp chúng rồi trộn lại.
          </p>
        </InfoCard>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <SectionIcons.Clock className="w-5 h-5 text-primary" />
            Các mốc quan trọng
          </h3>
          <div className="relative">
            {timeline.map((item, index) => (
              <TimelineItem key={item.year} {...item} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Practical Need */}
      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        <InfoCard icon={<SectionIcons.Lightbulb className="w-5 h-5" />} title="Tại sao cần Merge Sort?" delay={0.1}>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
              <span><strong className="text-foreground">Ổn định:</strong> Giữ nguyên thứ tự tương đối của các phần tử bằng nhau</span>
            </li>
            <li className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
              <span><strong className="text-foreground">Đảm bảo O(n log n):</strong> Hiệu năng không phụ thuộc vào dữ liệu đầu vào</span>
            </li>
            <li className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
              <span><strong className="text-foreground">External Sorting:</strong> Phù hợp sắp xếp dữ liệu lớn hơn bộ nhớ</span>
            </li>
            <li className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
              <span><strong className="text-foreground">Song song hóa:</strong> Dễ dàng chia công việc cho nhiều CPU</span>
            </li>
          </ul>
        </InfoCard>

        <InfoCard icon={<SectionIcons.BarChart3 className="w-5 h-5" />} title="Độ phức tạp" delay={0.2}>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
              <div className="text-sm text-muted-foreground mb-1">Time Complexity</div>
              <div className="font-mono">
                <div className="text-green">Best: <span className="text-primary">O(n log n)</span></div>
                <div className="text-orange">Average: <span className="text-primary">O(n log n)</span></div>
                <div className="text-red-400">Worst: <span className="text-primary">O(n log n)</span></div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
              <div className="text-sm text-muted-foreground mb-1">Space Complexity</div>
              <div className="font-mono text-2xl text-accent">O(n)</div>
              <div className="text-xs text-muted-foreground mt-1">Cần mảng phụ để trộn</div>
            </div>
          </div>
        </InfoCard>
      </div>

      {/* Algorithm Steps */}
      <div className="mb-16">
        <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
          <GitMerge className="w-6 h-6 text-primary" />
          Các bước thực hiện
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AlgorithmStep 
            number={1} 
            title="Chia (Divide)" 
            description="Chia mảng thành 2 nửa bằng nhau tại điểm giữa"
          />
          <AlgorithmStep 
            number={2} 
            title="Đệ quy (Conquer)" 
            description="Gọi đệ quy để sắp xếp từng nửa mảng"
          />
          <AlgorithmStep 
            number={3} 
            title="Trộn (Merge)" 
            description="Trộn 2 nửa đã sắp xếp thành mảng hoàn chỉnh"
          />
          <AlgorithmStep 
            number={4} 
            title="Hoàn thành" 
            description="Mảng được sắp xếp khi tất cả phần tử được trộn"
          />
        </div>
      </div>

      {/* Visualization */}
      <motion.div
        ref={visualRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isVisualInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
          <SectionIcons.BarChart3 className="w-6 h-6 text-primary" />
          Minh họa quá trình sắp xếp
        </h3>
        <div className="glass-card p-6 md:p-8">
          <div className="text-center mb-6">
            <div className="text-sm text-muted-foreground mb-2">Input: [38, 27, 43, 3, 9, 82, 10]</div>
          </div>
          
          {/* Visual tree */}
          <div className="overflow-x-auto">
            <div className="min-w-[600px] space-y-6">
              {/* Level 0 */}
              <div className="flex justify-center">
                <div className="px-4 py-2 rounded-lg bg-primary/20 border border-primary/50 font-mono text-sm">
                  [38, 27, 43, 3, 9, 82, 10]
                </div>
              </div>
              
              {/* Level 1 */}
              <div className="flex justify-center gap-16">
                <div className="px-4 py-2 rounded-lg bg-accent/20 border border-accent/50 font-mono text-sm">
                  [38, 27, 43, 3]
                </div>
                <div className="px-4 py-2 rounded-lg bg-accent/20 border border-accent/50 font-mono text-sm">
                  [9, 82, 10]
                </div>
              </div>
              
              {/* Level 2 */}
              <div className="flex justify-center gap-4">
                <div className="px-3 py-2 rounded-lg bg-green/20 border border-green/50 font-mono text-sm">
                  [38, 27]
                </div>
                <div className="px-3 py-2 rounded-lg bg-green/20 border border-green/50 font-mono text-sm">
                  [43, 3]
                </div>
                <div className="w-8" />
                <div className="px-3 py-2 rounded-lg bg-green/20 border border-green/50 font-mono text-sm">
                  [9, 82]
                </div>
                <div className="px-3 py-2 rounded-lg bg-green/20 border border-green/50 font-mono text-sm">
                  [10]
                </div>
              </div>
              
              {/* Arrow down */}
              <div className="flex justify-center">
                <div className="text-2xl text-primary">↓ Merge ↓</div>
              </div>
              
              {/* Merged Level 2 */}
              <div className="flex justify-center gap-4">
                <div className="px-3 py-2 rounded-lg bg-green/30 border border-green font-mono text-sm">
                  [27, 38]
                </div>
                <div className="px-3 py-2 rounded-lg bg-green/30 border border-green font-mono text-sm">
                  [3, 43]
                </div>
                <div className="w-8" />
                <div className="px-3 py-2 rounded-lg bg-green/30 border border-green font-mono text-sm">
                  [9, 82]
                </div>
                <div className="px-3 py-2 rounded-lg bg-green/30 border border-green font-mono text-sm">
                  [10]
                </div>
              </div>
              
              {/* Merged Level 1 */}
              <div className="flex justify-center gap-16">
                <div className="px-4 py-2 rounded-lg bg-accent/30 border border-accent font-mono text-sm">
                  [3, 27, 38, 43]
                </div>
                <div className="px-4 py-2 rounded-lg bg-accent/30 border border-accent font-mono text-sm">
                  [9, 10, 82]
                </div>
              </div>
              
              {/* Final */}
              <div className="flex justify-center">
                <div className="px-4 py-2 rounded-lg bg-primary/30 border border-primary font-mono text-sm animate-glow-pulse">
                  [3, 9, 10, 27, 38, 43, 82]
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Code */}
      <div className="mb-16">
        <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
          <SectionIcons.Code2 className="w-6 h-6 text-primary" />
          Code C đầy đủ
        </h3>
        <CodeBlock code={mergeSortCode} title="merge_sort.c" />
      </div>

      {/* Applications */}
      <div>
        <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
          <SectionIcons.Cpu className="w-6 h-6 text-primary" />
          Ứng dụng thực tế
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {applications.map((app, index) => (
            <motion.div
              key={app.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-4 text-center hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3 text-primary">
                {app.icon}
              </div>
              <h4 className="font-semibold mb-1">{app.title}</h4>
              <p className="text-sm text-muted-foreground">{app.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AlgorithmSection>
  );
}
