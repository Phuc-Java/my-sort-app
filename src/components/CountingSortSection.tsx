import { AlgorithmSection, InfoCard, TimelineItem, AlgorithmStep, SectionIcons } from './AlgorithmSection';
import CodeBlock from './CodeBlock';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Hash, Gauge, Target, Palette, Vote, Users, GraduationCap } from 'lucide-react';

const countingSortCode = `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Tìm giá trị lớn nhất trong mảng
int getMax(int arr[], int n) {
    int max = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > max)
            max = arr[i];
    }
    return max;
}

// Hàm Counting Sort
void countingSort(int arr[], int n) {
    // Bước 1: Tìm giá trị lớn nhất
    int max = getMax(arr, n);
    
    // Bước 2: Tạo mảng đếm count[0..max]
    int *count = (int*)calloc(max + 1, sizeof(int));
    
    // Bước 3: Đếm số lần xuất hiện của mỗi phần tử
    for (int i = 0; i < n; i++) {
        count[arr[i]]++;
    }
    
    // Bước 4: Tính tổng tích lũy
    // count[i] sẽ chứa vị trí thực của phần tử trong mảng output
    for (int i = 1; i <= max; i++) {
        count[i] += count[i - 1];
    }
    
    // Bước 5: Tạo mảng output
    int *output = (int*)malloc(n * sizeof(int));
    
    // Bước 6: Xây dựng mảng output (duyệt ngược để stable)
    for (int i = n - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    
    // Bước 7: Sao chép mảng output về mảng gốc
    for (int i = 0; i < n; i++) {
        arr[i] = output[i];
    }
    
    // Giải phóng bộ nhớ
    free(count);
    free(output);
}

// Phiên bản Counting Sort xử lý số âm
void countingSortWithNegative(int arr[], int n) {
    // Tìm min và max
    int min = arr[0], max = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < min) min = arr[i];
        if (arr[i] > max) max = arr[i];
    }
    
    int range = max - min + 1;
    int *count = (int*)calloc(range, sizeof(int));
    int *output = (int*)malloc(n * sizeof(int));
    
    // Đếm (dịch index bằng -min)
    for (int i = 0; i < n; i++)
        count[arr[i] - min]++;
    
    // Tổng tích lũy
    for (int i = 1; i < range; i++)
        count[i] += count[i - 1];
    
    // Xây dựng output
    for (int i = n - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }
    
    // Sao chép về mảng gốc
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
    
    free(count);
    free(output);
}

// Hàm in mảng
void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\\n");
}

// Hàm main để test
int main() {
    int arr[] = {4, 2, 2, 8, 3, 3, 1};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Mảng ban đầu: ");
    printArray(arr, n);
    
    countingSort(arr, n);
    
    printf("Mảng sau khi sắp xếp: ");
    printArray(arr, n);
    
    // Test với số âm
    int arr2[] = {-5, -10, 0, -3, 8, 5, -1, 10};
    int n2 = sizeof(arr2) / sizeof(arr2[0]);
    
    printf("\\nMảng với số âm: ");
    printArray(arr2, n2);
    
    countingSortWithNegative(arr2, n2);
    
    printf("Sau sắp xếp: ");
    printArray(arr2, n2);
    
    return 0;
}`;

const timeline = [
  { year: '1954', title: 'Harold H. Seward phát minh', description: 'Counting Sort được giới thiệu bởi Harold H. Seward tại MIT trong luận văn thạc sĩ.' },
  { year: '1961', title: 'Radix Sort kết hợp', description: 'Counting Sort trở thành thành phần cốt lõi của Radix Sort cho sắp xếp số nguyên.' },
  { year: '1990s', title: 'Histogram applications', description: 'Ứng dụng rộng rãi trong xử lý ảnh và phân tích dữ liệu histogram.' },
  { year: 'Hiện tại', title: 'GPU Computing', description: 'Được tối ưu cho GPU với khả năng song song hóa cao trong CUDA/OpenCL.' },
];

const applications = [
  { icon: <Palette className="w-5 h-5" />, title: 'Xử lý ảnh', desc: 'Histogram equalization, color quantization' },
  { icon: <Vote className="w-5 h-5" />, title: 'Hệ thống bầu cử', desc: 'Đếm và sắp xếp phiếu bầu nhanh chóng' },
  { icon: <GraduationCap className="w-5 h-5" />, title: 'Giáo dục', desc: 'Phân loại điểm số học sinh' },
  { icon: <Users className="w-5 h-5" />, title: 'Phân tích tuổi', desc: 'Thống kê nhân khẩu học' },
];

export default function CountingSortSection() {
  const visualRef = useRef(null);
  const isVisualInView = useInView(visualRef, { once: true, margin: '-100px' });

  return (
    <AlgorithmSection id="counting-sort" title="Counting Sort" gradient="accent">
      {/* History Section */}
      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        <InfoCard icon={<SectionIcons.History className="w-5 h-5" />} title="Lịch sử phát triển">
          <p className="mb-4">
            <strong className="text-foreground">Counting Sort</strong> được phát minh bởi{' '}
            <span className="text-accent">Harold H. Seward</span> vào năm 1954 tại MIT.
            Đây là thuật toán sắp xếp phi so sánh (non-comparison sort).
          </p>
          <p>
            Khác với các thuật toán dựa trên so sánh, Counting Sort đếm số lần xuất hiện 
            của mỗi giá trị và sử dụng thông tin này để xác định vị trí cuối cùng.
          </p>
        </InfoCard>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <SectionIcons.Clock className="w-5 h-5 text-accent" />
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
        <InfoCard icon={<SectionIcons.Lightbulb className="w-5 h-5" />} title="Khi nào dùng Counting Sort?" delay={0.1}>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <Target className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
              <span><strong className="text-foreground">Số nguyên nhỏ:</strong> Khi giá trị nằm trong khoảng nhỏ (k ≈ n)</span>
            </li>
            <li className="flex items-start gap-2">
              <Target className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
              <span><strong className="text-foreground">Biết trước range:</strong> Khi biết min/max của dữ liệu</span>
            </li>
            <li className="flex items-start gap-2">
              <Target className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
              <span><strong className="text-foreground">Stable sorting:</strong> Cần giữ thứ tự tương đối</span>
            </li>
            <li className="flex items-start gap-2">
              <Target className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
              <span><strong className="text-foreground">Linear time:</strong> Yêu cầu O(n) thay vì O(n log n)</span>
            </li>
          </ul>
        </InfoCard>

        <InfoCard icon={<SectionIcons.BarChart3 className="w-5 h-5" />} title="Độ phức tạp" delay={0.2}>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
              <div className="text-sm text-muted-foreground mb-1">Time Complexity</div>
              <div className="font-mono">
                <div className="text-green">Best: <span className="text-accent">O(n + k)</span></div>
                <div className="text-orange">Average: <span className="text-accent">O(n + k)</span></div>
                <div className="text-red-400">Worst: <span className="text-accent">O(n + k)</span></div>
              </div>
              <div className="text-xs text-muted-foreground mt-2">k = range của giá trị</div>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
              <div className="text-sm text-muted-foreground mb-1">Space Complexity</div>
              <div className="font-mono text-2xl text-accent">O(n + k)</div>
              <div className="text-xs text-muted-foreground mt-1">Mảng count + output</div>
            </div>
          </div>
        </InfoCard>
      </div>

      {/* Algorithm Steps */}
      <div className="mb-16">
        <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
          <Hash className="w-6 h-6 text-accent" />
          Các bước thực hiện
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AlgorithmStep 
            number={1} 
            title="Tìm Max" 
            description="Xác định giá trị lớn nhất trong mảng để biết kích thước mảng đếm"
          />
          <AlgorithmStep 
            number={2} 
            title="Khởi tạo Count" 
            description="Tạo mảng count[0..max] với tất cả giá trị bằng 0"
          />
          <AlgorithmStep 
            number={3} 
            title="Đếm" 
            description="Đếm số lần xuất hiện của mỗi phần tử trong mảng gốc"
          />
          <AlgorithmStep 
            number={4} 
            title="Tổng tích lũy" 
            description="Tính tổng cộng dồn để xác định vị trí cuối cùng"
          />
          <AlgorithmStep 
            number={5} 
            title="Xây dựng Output" 
            description="Đặt từng phần tử vào đúng vị trí trong mảng kết quả"
          />
          <AlgorithmStep 
            number={6} 
            title="Hoàn thành" 
            description="Sao chép mảng output về mảng gốc"
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
          <Gauge className="w-6 h-6 text-accent" />
          Minh họa quá trình sắp xếp
        </h3>
        <div className="glass-card p-6 md:p-8">
          <div className="text-center mb-8">
            <div className="text-sm text-muted-foreground mb-2">Input: [4, 2, 2, 8, 3, 3, 1]</div>
          </div>
          
          <div className="space-y-8">
            {/* Step 1: Original array */}
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-3">Bước 1: Mảng ban đầu</div>
              <div className="flex justify-center gap-2">
                {[4, 2, 2, 8, 3, 3, 1].map((val, i) => (
                  <div key={i} className="w-12 h-12 rounded-lg bg-accent/20 border border-accent/50 flex items-center justify-center font-mono font-bold">
                    {val}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Count array */}
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-3">Bước 2: Mảng đếm count[0..8]</div>
              <div className="flex justify-center gap-1">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => {
                  const counts = [0, 1, 2, 2, 1, 0, 0, 0, 1];
                  return (
                    <div key={idx} className="text-center">
                      <div className="text-xs text-muted-foreground mb-1">{idx}</div>
                      <div className={`w-8 h-8 rounded flex items-center justify-center font-mono text-sm ${
                        counts[idx] > 0 ? 'bg-green/30 border border-green text-green' : 'bg-secondary/50 border border-border/50'
                      }`}>
                        {counts[idx]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Cumulative */}
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-3">Bước 3: Tổng tích lũy</div>
              <div className="flex justify-center gap-1">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => {
                  const cumulative = [0, 1, 3, 5, 6, 6, 6, 6, 7];
                  return (
                    <div key={idx} className="text-center">
                      <div className="text-xs text-muted-foreground mb-1">{idx}</div>
                      <div className={`w-8 h-8 rounded flex items-center justify-center font-mono text-sm ${
                        cumulative[idx] > (idx > 0 ? cumulative[idx-1] : 0) || idx === 0 
                          ? 'bg-primary/30 border border-primary text-primary' 
                          : 'bg-secondary/50 border border-border/50'
                      }`}>
                        {cumulative[idx]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Result */}
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-3">Bước 4: Mảng kết quả</div>
              <div className="flex justify-center gap-2">
                {[1, 2, 2, 3, 3, 4, 8].map((val, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isVisualInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="w-12 h-12 rounded-lg bg-accent/30 border border-accent flex items-center justify-center font-mono font-bold"
                  >
                    {val}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Code */}
      <div className="mb-16">
        <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
          <SectionIcons.Code2 className="w-6 h-6 text-accent" />
          Code C đầy đủ
        </h3>
        <CodeBlock code={countingSortCode} title="counting_sort.c" />
      </div>

      {/* Applications */}
      <div>
        <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
          <SectionIcons.Cpu className="w-6 h-6 text-accent" />
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
              className="glass-card p-4 text-center hover:border-accent/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3 text-accent">
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
