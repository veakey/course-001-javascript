/**
 * Terminal/Interpréteur JavaScript
 * Charge le contenu de game.js et permet son exécution
 * Utilise CodeMirror 6 pour la coloration syntaxique
 */

class Terminal {
  constructor(codeEditorId, executeBtnId, outputId, gameJsPath) {
    this.codeEditorContainer = document.getElementById(codeEditorId);
    this.executeBtn = document.getElementById(executeBtnId);
    this.output = document.getElementById(outputId);
    this.gameJsPath = gameJsPath;
    this.originalCode = '';
    this.editor = null;

    this.init();
  }

  async init() {
    // Initialiser CodeMirror si disponible
    if (window.CodeMirror) {
      this.initCodeMirror();
    } else {
      // Fallback: attendre que CodeMirror soit chargé
      const checkCodeMirror = setInterval(() => {
        if (window.CodeMirror) {
          clearInterval(checkCodeMirror);
          this.initCodeMirror();
        }
      }, 100);
      
      // Timeout après 5 secondes
      setTimeout(() => {
        clearInterval(checkCodeMirror);
        if (!this.editor) {
          console.warn('CodeMirror non chargé, utilisation du textarea par défaut');
          this.initFallback();
        }
      }, 5000);
    }
  }

  initCodeMirror() {
    // Vider le conteneur avant d'initialiser CodeMirror pour éviter les doublons
    this.codeEditorContainer.innerHTML = '';
    
    // Créer l'éditeur CodeMirror avec thème dark (monokai)
    this.editor = CodeMirror(this.codeEditorContainer, {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      indentUnit: 2,
      tabSize: 2,
      indentWithTabs: false,
      autofocus: false,
      extraKeys: {
        'Ctrl-Enter': () => {
          this.execute();
        }
      }
    });

    // Attacher les événements
    this.executeBtn.addEventListener('click', () => this.execute());

    // Charger le contenu de game.js
    this.loadGameCode();
  }

  initFallback() {
    // Fallback si CodeMirror n'est pas disponible
    this.codeEditorContainer.innerHTML = '<textarea id="code-editor-textarea" style="width: 100%; min-height: 400px; font-family: monospace;"></textarea>';
    const textarea = document.getElementById('code-editor-textarea');
    
    this.executeBtn.addEventListener('click', () => this.execute());
    textarea.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        this.execute();
      }
    });

    this.editor = {
      getValue: () => textarea.value,
      setValue: (value) => { textarea.value = value; }
    };

    this.loadGameCode();
  }

  async loadGameCode() {
    try {
      // Chercher une balise script avec id="game-code" dans le DOM
      const gameCodeScript = document.getElementById('game-code');
      
      if (gameCodeScript) {
        // Lire le contenu depuis la balise script
        const code = gameCodeScript.textContent || gameCodeScript.innerHTML;
        this.originalCode = code;
        if (this.editor) {
          this.editor.setValue(code);
        }
        return;
      }
      
      // Fallback: essayer fetch() si on est sur http/https (avec serveur)
      if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
        const response = await fetch(this.gameJsPath);
        if (!response.ok) {
          throw new Error(`Erreur lors du chargement de ${this.gameJsPath}`);
        }
        const code = await response.text();
        this.originalCode = code;
        if (this.editor) {
          this.editor.setValue(code);
        }
      } else {
        throw new Error('Le code du jeu doit être inclus dans une balise <script type="text/plain" id="game-code"> dans le HTML');
      }
    } catch (error) {
      this.showOutput(`Erreur: ${error.message}`, 'error');
      console.error('Erreur lors du chargement du code:', error);
    }
  }

  execute() {
    const code = this.editor ? this.editor.getValue() : '';
    
    // Vider la sortie précédente
    this.clearOutput();

    try {
      // Capturer console.log, console.error, etc.
      const originalLog = console.log;
      const originalError = console.error;
      const originalWarn = console.warn;
      const originalInfo = console.info;

      const logs = [];

      console.log = (...args) => {
        logs.push({ type: 'log', message: args.map(arg => this.formatOutput(arg)).join(' ') });
        originalLog.apply(console, args);
      };

      console.error = (...args) => {
        logs.push({ type: 'error', message: args.map(arg => this.formatOutput(arg)).join(' ') });
        originalError.apply(console, args);
      };

      console.warn = (...args) => {
        logs.push({ type: 'warn', message: args.map(arg => this.formatOutput(arg)).join(' ') });
        originalWarn.apply(console, args);
      };

      console.info = (...args) => {
        logs.push({ type: 'info', message: args.map(arg => this.formatOutput(arg)).join(' ') });
        originalInfo.apply(console, args);
      };

      // Exécuter le code dans un contexte isolé
      const result = new Function(code)();

      // Restaurer les fonctions console
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
      console.info = originalInfo;

      // Afficher les logs
      if (logs.length > 0) {
        logs.forEach(log => {
          this.showOutput(log.message, log.type);
        });
      } else if (result !== undefined) {
        this.showOutput(this.formatOutput(result), 'info');
      } else {
        this.showOutput('Code exécuté avec succès', 'success');
      }

    } catch (error) {
      this.showOutput(`Erreur: ${error.message}`, 'error');
      console.error('Erreur d\'exécution:', error);
    }
  }

  formatOutput(value) {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'object') {
      try {
        return JSON.stringify(value, null, 2);
      } catch (e) {
        return String(value);
      }
    }
    return String(value);
  }

  showOutput(message, type = 'info') {
    const line = document.createElement('div');
    line.className = type;
    line.textContent = message;
    this.output.appendChild(line);
    this.output.scrollTop = this.output.scrollHeight;
  }

  clearOutput() {
    this.output.innerHTML = '';
    this.output.className = '';
  }

  reset() {
    if (this.editor) {
      this.editor.setValue(this.originalCode);
    }
    this.clearOutput();
  }
}

// Initialisation automatique si les éléments existent
document.addEventListener('DOMContentLoaded', () => {
  const codeEditor = document.getElementById('code-editor');
  const executeBtn = document.getElementById('execute-btn');
  const output = document.getElementById('output');
  const gameJsPath = document.getElementById('game-js-path')?.dataset.path || 'js/game.js';

  if (codeEditor && executeBtn && output) {
    window.terminal = new Terminal('code-editor', 'execute-btn', 'output', gameJsPath);
  }
});
