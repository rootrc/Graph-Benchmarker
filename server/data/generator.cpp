#include <iostream>
#include <fstream>
#include <string>
#include <random>
#include <unordered_set>

using namespace std;

void generate(string fileName, int N, int M) {
    random_device rd;  
    mt19937 gen(rd()); 
    std::uniform_int_distribution<> dist(1, N);
    std::uniform_int_distribution<> dist2(1, 64);
    fileName = "C:\\Users\\Admin\\Downloads\\Graph-Benchmarker\\server\\data\\" + fileName;
    ofstream file(fileName);
    if (!file.is_open()) {
        cerr << "Failed to open file: " << fileName << endl;
        return;
    }
    file << "[\n";
    file << "  { \"data\": { \"id\": \"1\" }, \"classes\": \"start-node\" },\n";
    for (int i = 2; i <= N; i++) {
        file << "  { \"data\": { \"id\": \""<< i << "\" } }," << "\n";
    }
    file << "\n";

    unordered_set<int> s;
    int a = 0;
    int b = 0;
    for (int i = 1; i <= N; i++) {
        do {
            a = i;
            b = dist(gen);
        } while (a == b || s.find(10000 * a + b) != s.end() || s.find(10000 * b + a) != s.end());
    
        s.insert(10000 * a + b);
        if (i < M) {
            file << "  { \"data\": { \"id\": \"" << a << "-" << b << "\", \"source\": \"" << a << "\", \"target\": \""<< b << "\", \"weight\": \"" << dist2(gen) << "\" } },\n";
        } else {
            file << "  { \"data\": { \"id\": \"" << a << "-" << b << "\", \"source\": \"" << a << "\", \"target\": \""<< b << "\", \"weight\": \"" << dist2(gen) << "\" } },\n\n";
        }
    }
    for (int i = N + 1; i <= M; i++) {
        do {
            a = dist(gen);
            b = dist(gen);
        } while (a == b || s.find(10000 * a + b) != s.end() || s.find(10000 * b + a) != s.end());
        s.insert(10000 * a + b);
        if (i < M) {
            file << "  { \"data\": { \"id\": \"" << a << "-" << b << "\", \"source\": \"" << a << "\", \"target\": \""<< b << "\", \"weight\": \"" << dist2(gen) << "\" } },\n";
        } else {
            file << "  { \"data\": { \"id\": \"" << a << "-" << b << "\", \"source\": \"" << a << "\", \"target\": \""<< b << "\", \"weight\": \"" << dist2(gen) << "\" } }\n";
        }
    }
    file << "]";
    file.close();
    cout << "File generated successfully!" << "\n";
    cout << fileName << "\n";
}

int main() {
    generate("test1.json", 200, 280);
}
