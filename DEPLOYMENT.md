# 배포 가이드 (Deployment Guide)

## 🚀 빠른 시작 (3분 안에 배포하기)

```bash
# 1. 데이터 파일 복사
cd dm-app
.\prepare-deployment.ps1

# 2. Git 커밋 & 푸시
git add .
git commit -m "Ready for deployment"
git push

# 3. Vercel에서 배포
# https://vercel.com 방문 → GitHub 연동 → 배포
```

---

## 🌟 추천 방법: Vercel (가장 간단!)

### Vercel이 가장 좋은 이유
- Next.js를 만든 회사라서 완벽 지원
- GitHub과 연동하면 자동 배포
- 무료 플랜으로 충분
- 설정 거의 없음

### 배포 절차

#### 0단계: 배포 준비 (데이터 파일 복사)

배포하기 전에 데이터 파일을 public 폴더로 복사해야 합니다.

**방법 1: PowerShell 스크립트 실행 (추천)**
```powershell
cd dm-app
.\prepare-deployment.ps1
```

**방법 2: 수동으로 복사**
1. 파일 탐색기에서 `damage_mechanisms.normalized.json` 파일 찾기
2. 복사 (Ctrl+C)
3. `dm-app\public` 폴더로 이동
4. 붙여넣기 (Ctrl+V)
5. 이름을 `damage_mechanisms.json`으로 변경

**방법 3: PowerShell 명령어**
```powershell
cd "D:\공부\개인\Programming\Damage Mechanisms"
Copy-Item "damage_mechanisms.normalized.json" -Destination "dm-app\public\damage_mechanisms.json"
```

#### 1단계: GitHub에 코드 업로드

1. GitHub 계정이 없다면 가입 (https://github.com)
2. 새 레포지토리 생성
   - 클릭: "New repository"
   - 이름: 예: `damage-mechanism-search`
   - Public 또는 Private 선택
   - "Create repository" 클릭

3. 터미널에서 다음 명령어 실행:

```bash
# 프로젝트 루트로 이동 (dm-app이 있는 폴더)
cd "D:\공부\개인\Programming\Damage Mechanisms"

# Git 저장소 초기화 (아직 안 했다면)
git init

# .gitignore이 이미 있으니 추가할 필요 없음

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: Damage Mechanism Search App"

# GitHub 레포지토리와 연결 (YOUR_USERNAME을 자신의 GitHub 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 또는 SSH 사용 시
# git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git

# 코드 푸시
git branch -M main
git push -u origin main
```

#### 2단계: Vercel에 배포

1. Vercel 사이트 방문: https://vercel.com
2. GitHub 계정으로 로그인
3. "Add New..." → "Project" 클릭
4. GitHub 레포지토리 선택
5. 설정 확인:
   - **Framework Preset**: Next.js (자동 감지됨)
   - **Root Directory**: `dm-app`으로 설정 (중요!)
   - **Build Command**: `npm run build` (자동)
   - **Output Directory**: `.next` (자동)
   
   ⚠️ **중요**: 프로젝트가 프로젝트 루트가 아니라 `dm-app` 폴더 안에 있으므로, 
   Root Directory를 `dm-app`으로 반드시 설정해야 합니다!
   
6. "Deploy" 클릭

#### 3단계: 완료!

배포가 완료되면:
- 자동으로 URL 제공 (예: `https://your-app-name.vercel.app`)
- 코드를 푸시할 때마다 자동으로 재배포됨
- 무료 SSL 인증서 자동 적용

---

## 🔄 다른 배포 옵션

### Option 2: Netlify

1. Netlify 가입: https://www.netlify.com
2. GitHub 레포지토리 연동
3. Build settings:
   - Base directory: `dm-app`
   - Build command: `npm run build`
   - Publish directory: `dm-app/.next`

### Option 3: GitHub Pages (정적 빌드 필요)

Next.js를 정적 사이트로 빌드하려면:

```bash
cd dm-app

# package.json 수정 필요 (npm run export 추가)
# next.config.ts에 output: 'export' 추가 필요
```

---

## ⚠️ 주의사항

### 데이터 파일 위치
현재 프로젝트는 `damage_mechanisms.normalized.json`을 상위 디렉토리에서 읽습니다.
따라서 Vercel/Netlify에서는 **Root Directory를 `dm-app`으로 설정**하면 안 됩니다.

**해결 방법 1: 파일 복사**
```bash
cd dm-app/public
cp ../damage_mechanisms.normalized.json .
```

그리고 `data.ts` 수정:
```typescript
const projectRoot = process.cwd();
const jsonPath = path.join(projectRoot, 'public', 'damage_mechanisms.normalized.json');
```

**해결 방법 2: 프로젝트 루트를 워크스페이스 루트로 설정**
- Vercel의 Root Directory를 `.`로 설정
- Build command를 `cd dm-app && npm run build`로 설정
- Output directory를 `dm-app/.next`로 설정

---

## 📝 체크리스트

- [ ] GitHub 계정 생성
- [ ] 레포지토리 생성
- [ ] 코드 푸시
- [ ] Vercel/Netlify 계정 생성
- [ ] 배포 플랫폼과 GitHub 연동
- [ ] Root Directory 설정
- [ ] 배포 완료 확인
- [ ] URL 테스트

