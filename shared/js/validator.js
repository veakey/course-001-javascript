/**
 * Système de validation de code pour les mini-jeux
 * Vérifie que le code corrigé passe tous les tests
 */

class CodeValidator {
  constructor() {
    this.validators = {
      '01_robot_and_coder': this.validateRobot.bind(this),
      '02_variables_and_data_types': this.validateVariables.bind(this),
      '03_inputs_and_outputs': this.validateInputsOutputs.bind(this),
      '04_arrays_insult_generator': this.validateArrays.bind(this),
      '05_loops_sheep_counter': this.validateLoops.bind(this),
      '06_hangman': this.validateHangman.bind(this),
      '07_functions_superpower': this.validateFunctions.bind(this),
      '08_events_treasure_hunt': this.validateEvents.bind(this),
      '09_canvas_digital_artist': this.validateCanvas.bind(this),
      '10_boss_snake': this.validateSnake.bind(this)
    };
  }

  /**
   * Valide le code pour un jeu donné
   * @param {string} gameId - Identifiant du jeu (ex: '01_robot_and_coder')
   * @param {string} code - Code à valider
   * @returns {Object} { allPassed: boolean, tests: [{ name, passed, message }] }
   */
  validate(gameId, code) {
    const validator = this.validators[gameId];
    if (!validator) {
      return {
        allPassed: false,
        tests: [{
          name: 'Validateur trouvé',
          passed: false,
          message: `Aucun validateur trouvé pour le jeu: ${gameId}`
        }]
      };
    }

    try {
      return validator(code);
    } catch (error) {
      return {
        allPassed: false,
        tests: [{
          name: 'Erreur de validation',
          passed: false,
          message: `Erreur lors de la validation: ${error.message}`
        }]
      };
    }
  }

  /**
   * Teste si le code peut être exécuté sans erreur de syntaxe
   */
  testSyntax(code) {
    try {
      // Essayer de parser le code ligne par ligne pour mieux détecter les erreurs
      const lines = code.split('\n');
      
      // Vérifier d'abord les erreurs évidentes (guillemets non fermés)
      // Mais ignorer les commentaires et les apostrophes dans les commentaires
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmedLine = line.trim();
        
        // Ignorer les lignes de commentaires (// ou /*)
        if (trimmedLine.startsWith('//') || trimmedLine.startsWith('/*')) {
          continue;
        }
        
        // Trouver où commence le commentaire dans la ligne (s'il y en a un)
        let commentStart = -1;
        const singleLineComment = line.indexOf('//');
        const multiLineCommentStart = line.indexOf('/*');
        
        if (singleLineComment !== -1 && (multiLineCommentStart === -1 || singleLineComment < multiLineCommentStart)) {
          commentStart = singleLineComment;
        } else if (multiLineCommentStart !== -1) {
          commentStart = multiLineCommentStart;
        }
        
        // Analyser seulement la partie avant le commentaire
        const codePart = commentStart !== -1 ? line.substring(0, commentStart) : line;
        
        let inString = false;
        let stringChar = null;
        let escaped = false;
        
        for (let j = 0; j < codePart.length; j++) {
          const char = codePart[j];
          if (escaped) {
            escaped = false;
            continue;
          }
          if (char === '\\') {
            escaped = true;
            continue;
          }
          // Ne traiter que les guillemets, pas les apostrophes dans les commentaires
          if ((char === '"' || char === "'" || char === '`') && !inString) {
            inString = true;
            stringChar = char;
          } else if (char === stringChar && inString) {
            inString = false;
            stringChar = null;
          }
        }
        
        // Si on est encore dans une string à la fin de la ligne et que ce n'est pas la dernière ligne
        if (inString && i < lines.length - 1) {
          // Vérifier si la ligne suivante continue la string
          const nextLine = lines[i + 1];
          if (!nextLine.trim().startsWith(stringChar) && !nextLine.includes('+')) {
            return {
              passed: false,
              message: `Ligne ${i + 1}: Guillemet non fermé (${stringChar})`,
              line: i + 1
            };
          }
        }
      }
      
      // Essayer d'exécuter le code
      new Function(code);
      return { passed: true, message: '', line: null };
    } catch (error) {
      // Extraire le numéro de ligne depuis le message d'erreur ou la stack
      let lineNumber = null;
      
      // Méthode 1: Chercher dans le message d'erreur
      const lineMatch = error.message.match(/(?:line|Ligne|at line)\s*:?\s*(\d+)/i);
      if (lineMatch) {
        lineNumber = parseInt(lineMatch[1]);
      }
      
      // Méthode 2: Chercher dans la stack trace (format: at <anonymous>:1:5)
      if (!lineNumber && error.stack) {
        const stackMatch = error.stack.match(/<anonymous>|<Function>:(\d+):(\d+)/);
        if (stackMatch) {
          lineNumber = parseInt(stackMatch[1]);
        }
      }
      
      // Méthode 3: Analyser le code pour trouver des erreurs de syntaxe communes
      if (!lineNumber) {
        const lines = code.split('\n');
        let quoteState = { single: 0, double: 0, backtick: 0 };
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          const trimmedLine = line.trim();
          
          // Ignorer complètement les lignes de commentaires
          if (trimmedLine.startsWith('//') || trimmedLine.startsWith('/*')) {
            continue;
          }
          
          // Trouver où commence le commentaire dans la ligne (s'il y en a un)
          let commentStart = -1;
          const singleLineComment = line.indexOf('//');
          const multiLineCommentStart = line.indexOf('/*');
          
          if (singleLineComment !== -1 && (multiLineCommentStart === -1 || singleLineComment < multiLineCommentStart)) {
            commentStart = singleLineComment;
          } else if (multiLineCommentStart !== -1) {
            commentStart = multiLineCommentStart;
          }
          
          // Analyser seulement la partie avant le commentaire
          const codePart = commentStart !== -1 ? line.substring(0, commentStart) : line;
          
          // Compter les guillemets (en tenant compte des échappements) - seulement dans le code, pas les commentaires
          for (let j = 0; j < codePart.length; j++) {
            const char = codePart[j];
            const prevChar = j > 0 ? codePart[j - 1] : '';
            
            // Ignorer les caractères échappés
            if (prevChar === '\\') continue;
            
            if (char === "'") quoteState.single = (quoteState.single + 1) % 2;
            if (char === '"') quoteState.double = (quoteState.double + 1) % 2;
            if (char === '`') quoteState.backtick = (quoteState.backtick + 1) % 2;
          }
          
          // Si on détecte une erreur de guillemet non fermé
          if (quoteState.single !== 0 || quoteState.double !== 0 || quoteState.backtick !== 0) {
            // Vérifier si c'est la dernière ligne ou si l'erreur mentionne les guillemets
            if (error.message.includes("Unterminated") || error.message.includes("quoted") || 
                error.message.includes("guillemet") || i === lines.length - 1) {
              lineNumber = i + 1;
              break;
            }
          }
          
          // Vérifier les parenthèses/crochets/accolades non fermés (seulement dans le code)
          if (error.message.includes("Unexpected") || error.message.includes("Expected")) {
            const openParens = (codePart.match(/\(/g) || []).length;
            const closeParens = (codePart.match(/\)/g) || []).length;
            const openBrackets = (codePart.match(/\[/g) || []).length;
            const closeBrackets = (codePart.match(/\]/g) || []).length;
            const openBraces = (codePart.match(/\{/g) || []).length;
            const closeBraces = (codePart.match(/\}/g) || []).length;
            
            // Si déséquilibre important, probablement cette ligne
            if (Math.abs(openParens - closeParens) > 2 || 
                Math.abs(openBrackets - closeBrackets) > 2 ||
                Math.abs(openBraces - closeBraces) > 2) {
              lineNumber = i + 1;
              break;
            }
          }
        }
      }
      
      // Formater le message avec le numéro de ligne
      let message = error.message;
      if (lineNumber) {
        message = `Ligne ${lineNumber}: ${message}`;
      } else {
        // Si on n'a pas trouvé de ligne, indiquer qu'on cherche
        message = `${message} (ligne non détectée automatiquement)`;
      }
      
      return { passed: false, message: message, line: lineNumber };
    }
  }

  /**
   * Exécute le code dans un contexte isolé et retourne les fonctions exposées
   */
  executeCode(code) {
    const context = {
      document: window.document,
      console: window.console,
      Math: window.Math,
      setTimeout: window.setTimeout,
      clearTimeout: window.clearTimeout,
      setInterval: window.setInterval,
      clearInterval: window.clearInterval
    };

    try {
      const func = new Function(...Object.keys(context), code);
      func(...Object.values(context));
      return context;
    } catch (error) {
      throw new Error(`Erreur d'exécution: ${error.message}`);
    }
  }

  // ========== VALIDATEURS PAR JEU ==========

  validateRobot(code) {
    const tests = [];

    // Test 1: Syntaxe valide
    const syntaxTest = this.testSyntax(code);
    tests.push({
      name: 'Syntaxe valide',
      passed: syntaxTest.passed,
      message: syntaxTest.passed ? '' : syntaxTest.message
    });

    if (!syntaxTest.passed) {
      return { allPassed: false, tests };
    }

    // Test 2: tournerDroite() fonctionne correctement
    // Chercher la fonction tournerDroite et vérifier qu'elle utilise +=
    const tournerDroiteMatch = code.match(/function\s+tournerDroite\s*\(\)[\s\S]*?robotAngle\s*([+\-=]+)\s*90/);
    if (tournerDroiteMatch) {
      const op = tournerDroiteMatch[1].trim();
      // Vérifier que c'est += (pas -=)
      const passed = op === '+=' || (op.includes('+') && !op.includes('-'));
      tests.push({
        name: 'tournerDroite() fonctionne',
        passed: passed,
        message: passed ? '' : 'La fonction tournerDroite() doit augmenter l\'angle de 90° (utiliser += au lieu de -=)'
      });
    } else {
      tests.push({
        name: 'tournerDroite() fonctionne',
        passed: false,
        message: 'La fonction tournerDroite() doit modifier robotAngle'
      });
    }

    // Test 3: Limites de la grille dans avancer()
    // Chercher la fonction avancer et vérifier la condition des limites
    const avancerMatch = code.match(/function\s+avancer\s*\(\)[\s\S]*?if\s*\([^)]*newX[^)]*\)/);
    if (avancerMatch) {
      // Vérifier que la condition utilise >= 0 (pas > 0)
      const conditionMatch = code.match(/if\s*\(newX\s*>=\s*0\s*&&\s*newX\s*<\s*tileCountX/);
      tests.push({
        name: 'Limites de la grille',
        passed: conditionMatch !== null,
        message: conditionMatch ? '' : 'La fonction avancer() doit vérifier les limites avec >= 0 et < tileCountX (pas > 0)'
      });
    } else {
      tests.push({
        name: 'Limites de la grille',
        passed: false,
        message: 'Impossible de trouver la fonction avancer()'
      });
    }

    const allPassed = tests.every(t => t.passed);
    return { allPassed, tests };
  }

  validateVariables(code) {
    const tests = [];

    // Test 1: Syntaxe valide
    const syntaxTest = this.testSyntax(code);
    tests.push({
      name: 'Syntaxe valide',
      passed: syntaxTest.passed,
      message: syntaxTest.passed ? '' : syntaxTest.message
    });

    if (!syntaxTest.passed) {
      return { allPassed: false, tests };
    }

    // Test 2: Addition correcte des quantités (pas de -2)
    const correctAddition = code.match(/itemExistant\.quantite\s*\+=\s*quantiteNum\s*;/);
    const bugAddition = code.match(/itemExistant\.quantite\s*\+=\s*quantiteNum\s*-\s*2\s*;/);
    tests.push({
      name: 'Addition correcte des quantités',
      passed: correctAddition !== null && bugAddition === null,
      message: (correctAddition !== null && bugAddition === null) ? '' : 'La fonction ajouterItem() doit additionner exactement quantiteNum (pas quantiteNum - 2)'
    });

    const allPassed = tests.every(t => t.passed);
    return { allPassed, tests };
  }

  validateInputsOutputs(code) {
    const tests = [];

    const syntaxTest = this.testSyntax(code);
    tests.push({
      name: 'Syntaxe valide',
      passed: syntaxTest.passed,
      message: syntaxTest.passed ? '' : `Erreur de syntaxe: ${syntaxTest.message}`
    });

    if (!syntaxTest.passed) {
      return { allPassed: false, tests };
    }

    // Test 2: Fonction afficher utilise textContent (pas innerHTML)
    const afficherMatch = code.match(/function\s+afficher\s*\([^)]*\)[\s\S]*?\.(textContent|innerHTML)\s*=\s*texte/);
    if (afficherMatch) {
      const passed = afficherMatch[1] === 'textContent';
      tests.push({
        name: 'afficher() utilise textContent',
        passed: passed,
        message: passed ? '' : 'La fonction afficher() doit utiliser textContent au lieu de innerHTML pour éviter les problèmes de sécurité'
      });
    } else {
      tests.push({
        name: 'afficher() utilise textContent',
        passed: false,
        message: 'Impossible de trouver la fonction afficher()'
      });
    }

    // Test 3: Fonction prompt log l'entrée
    const promptLogMatch = code.match(/function\s+prompt\s*\([^)]*\)[\s\S]*?console\.log\([^)]*userResponse/);
    tests.push({
      name: 'prompt() log l\'entrée',
      passed: promptLogMatch !== null,
      message: promptLogMatch ? '' : 'La fonction prompt() doit logger l\'entrée utilisateur avec console.log()'
    });

    const allPassed = tests.every(t => t.passed);
    return { allPassed, tests };
  }

  validateArrays(code) {
    const tests = [];

    const syntaxTest = this.testSyntax(code);
    tests.push({
      name: 'Syntaxe valide',
      passed: syntaxTest.passed,
      message: syntaxTest.passed ? '' : `Erreur de syntaxe: ${syntaxTest.message}`
    });

    if (!syntaxTest.passed) {
      return { allPassed: false, tests };
    }

    // Test 2: obtenirAleatoire utilise Math.floor
    const floorMatch = code.match(/function\s+obtenirAleatoire\s*\([^)]*\)[\s\S]*?Math\.floor\s*\(Math\.random\(\)\s*\*\s*tableau\.length\)/);
    tests.push({
      name: 'obtenirAleatoire() utilise Math.floor',
      passed: floorMatch !== null,
      message: floorMatch ? '' : 'La fonction obtenirAleatoire() doit utiliser Math.floor() au lieu de Math.ceil() pour éviter les index hors limites'
    });

    // Test 3: ajouterAdjectif utilise push
    const pushMatch = code.match(/function\s+ajouterAdjectif\s*\([^)]*\)[\s\S]*?adjectifs\.push\s*\(adj\)/);
    tests.push({
      name: 'ajouterAdjectif() utilise push',
      passed: pushMatch !== null,
      message: pushMatch ? '' : 'La fonction ajouterAdjectif() doit utiliser push() au lieu de unshift() pour ajouter à la fin du tableau'
    });

    const allPassed = tests.every(t => t.passed);
    return { allPassed, tests };
  }

  validateLoops(code) {
    const tests = [];

    const syntaxTest = this.testSyntax(code);
    tests.push({
      name: 'Syntaxe valide',
      passed: syntaxTest.passed,
      message: syntaxTest.passed ? '' : `Erreur de syntaxe: ${syntaxTest.message}`
    });

    if (!syntaxTest.passed) {
      return { allPassed: false, tests };
    }

    // Test 2: compterAvecFor utilise <=
    const forMatch = code.match(/function\s+compterAvecFor\s*\([^)]*\)[\s\S]*?for\s*\([^)]*i\s*<=\s*fin/);
    tests.push({
      name: 'compterAvecFor() utilise <=',
      passed: forMatch !== null,
      message: forMatch ? '' : 'La boucle for doit utiliser <= fin pour inclure la valeur finale'
    });

    // Test 3: compterAvecWhile incrémente i
    const whileMatch = code.match(/function\s+compterAvecWhile\s*\([^)]*\)[\s\S]*?while\s*\([^)]*\)[\s\S]*?console\.log\(i\)[\s\S]*?i\+\+/);
    tests.push({
      name: 'compterAvecWhile() incrémente i',
      passed: whileMatch !== null,
      message: whileMatch ? '' : 'La boucle while doit incrémenter i avec i++ pour éviter une boucle infinie'
    });

    // Test 4: selectionnerAleatoirement sélectionne le bon nombre
    const aleatoireMatchCorrect = code.match(/function\s+selectionnerAleatoirement\s*\([^)]*\)[\s\S]*?for\s*\([^)]*i\s*<\s*nombre\s*\)/);
    const aleatoireMatchBug = code.match(/function\s+selectionnerAleatoirement\s*\([^)]*\)[\s\S]*?for\s*\([^)]*i\s*<\s*nombre\s*-\s*1\s*\)/);
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/fa4766f7-5e1c-455a-ba2a-bc2044abe366',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'validator.js:validateLoops:selectionnerAleatoirement',message:'Testing selectionnerAleatoirement',data:{aleatoireMatchCorrect:!!aleatoireMatchCorrect,aleatoireMatchBug:!!aleatoireMatchBug,passed:aleatoireMatchCorrect !== null && aleatoireMatchBug === null},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    tests.push({
      name: 'selectionnerAleatoirement() sélectionne le bon nombre',
      passed: aleatoireMatchCorrect !== null && aleatoireMatchBug === null,
      message: (aleatoireMatchCorrect !== null && aleatoireMatchBug === null) ? '' : 'La fonction selectionnerAleatoirement() doit utiliser i < nombre (pas nombre - 1) pour sélectionner le bon nombre de moutons'
    });

    const allPassed = tests.every(t => t.passed);
    return { allPassed, tests };
  }

  validateHangman(code) {
    const tests = [];

    const syntaxTest = this.testSyntax(code);
    tests.push({
      name: 'Syntaxe valide',
      passed: syntaxTest.passed,
      message: syntaxTest.passed ? '' : `Erreur de syntaxe: ${syntaxTest.message}`
    });

    if (!syntaxTest.passed) {
      return { allPassed: false, tests };
    }

    // Test 2: Vérification des lettres déjà utilisées
    const checkUsedMatch = code.match(/if\s*\(lettresUtilisees\.includes\s*\(lettre\)\)/);
    tests.push({
      name: 'Vérification des lettres déjà utilisées',
      passed: checkUsedMatch !== null,
      message: checkUsedMatch ? '' : 'La fonction proposerLettre() doit vérifier si la lettre a déjà été utilisée avant de continuer'
    });

    // Test 3: erreurs++ seulement si lettre incorrecte
    const errorIncrementMatch = code.match(/if\s*\(motSecret\.includes\s*\(lettre\)\)[\s\S]*?else[\s\S]*?erreurs\+\+/);
    const errorBeforeIf = code.match(/erreurs\+\+[\s\S]*?if\s*\(motSecret\.includes\s*\(lettre\)\)/);
    tests.push({
      name: 'Erreurs incrémentées seulement si lettre incorrecte',
      passed: errorIncrementMatch !== null && errorBeforeIf === null,
      message: (errorIncrementMatch !== null && errorBeforeIf === null) ? '' : 'Les erreurs ne doivent être incrémentées que si la lettre n\'est pas dans le mot (dans le bloc else, pas avant le if)'
    });

    const allPassed = tests.every(t => t.passed);
    return { allPassed, tests };
  }

  validateFunctions(code) {
    const tests = [];

    const syntaxTest = this.testSyntax(code);
    tests.push({
      name: 'Syntaxe valide',
      passed: syntaxTest.passed,
      message: syntaxTest.passed ? '' : `Erreur de syntaxe: ${syntaxTest.message}`
    });

    if (!syntaxTest.passed) {
      return { allPassed: false, tests };
    }

    // Test 2: Ordre des appels dans dessinerChat - tête avant corps
    const teteAvantCorps = code.match(/dessinerTete\([^)]*\)[\s\S]*?dessinerCorps\(/);
    tests.push({
      name: 'Ordre des dessins correct',
      passed: teteAvantCorps !== null,
      message: teteAvantCorps ? '' : 'La fonction dessinerTete() doit être appelée avant dessinerCorps() pour un meilleur rendu visuel'
    });

    const allPassed = tests.every(t => t.passed);
    return { allPassed, tests };
  }

  validateEvents(code) {
    const tests = [];

    const syntaxTest = this.testSyntax(code);
    tests.push({
      name: 'Syntaxe valide',
      passed: syntaxTest.passed,
      message: syntaxTest.passed ? '' : `Erreur de syntaxe: ${syntaxTest.message}`
    });

    if (!syntaxTest.passed) {
      return { allPassed: false, tests };
    }

    // Test 2: Target généré dans nouvellePartie (pas commenté)
    const targetGenerated = code.match(/function\s+nouvellePartie\s*\([^)]*\)[\s\S]*?tresorX\s*=\s*Math\.random/);
    const targetCommented = code.match(/function\s+nouvellePartie\s*\([^)]*\)[\s\S]*?\/\/\s*tresorX\s*=\s*Math\.random/);
    tests.push({
      name: 'Target généré dans nouvellePartie',
      passed: targetGenerated !== null && targetCommented === null,
      message: (targetGenerated !== null && targetCommented === null) ? '' : 'Le trésor doit être généré avec Math.random() dans la fonction nouvellePartie() (les lignes ne doivent pas être commentées)'
    });

    const allPassed = tests.every(t => t.passed);
    return { allPassed, tests };
  }

  validateCanvas(code) {
    const tests = [];

    const syntaxTest = this.testSyntax(code);
    tests.push({
      name: 'Syntaxe valide',
      passed: syntaxTest.passed,
      message: syntaxTest.passed ? '' : `Erreur de syntaxe: ${syntaxTest.message}`
    });

    if (!syntaxTest.passed) {
      return { allPassed: false, tests };
    }

    // Test 2: dessinerCercle utilise fill
    const fillMatch = code.match(/function\s+dessinerCercle\s*\([^)]*\)[\s\S]*?ctx\.fill\(\)/);
    tests.push({
      name: 'dessinerCercle() utilise fill()',
      passed: fillMatch !== null,
      message: fillMatch ? '' : 'La fonction dessinerCercle() doit utiliser ctx.fill() au lieu de ctx.stroke() pour remplir le cercle'
    });

    const allPassed = tests.every(t => t.passed);
    return { allPassed, tests };
  }

  validateSnake(code) {
    const tests = [];

    const syntaxTest = this.testSyntax(code);
    tests.push({
      name: 'Syntaxe valide',
      passed: syntaxTest.passed,
      message: syntaxTest.passed ? '' : `Erreur de syntaxe: ${syntaxTest.message}`
    });

    if (!syntaxTest.passed) {
      return { allPassed: false, tests };
    }

    // Test 2: preventDefault pour les flèches
    // Chercher preventDefault avant le switch ou dans le contexte des flèches
    const keydownIndex = code.indexOf('keydown');
    const keydownSection = keydownIndex !== -1 ? code.substring(keydownIndex, keydownIndex + 1000) : '';
    const hasArrowKeys = /ArrowUp|ArrowDown|ArrowLeft|ArrowRight/.test(keydownSection);
    const hasPreventDefault = /e\.preventDefault\s*\(\)/.test(keydownSection);
    const preventDefaultMatch = hasArrowKeys && hasPreventDefault;
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/fa4766f7-5e1c-455a-ba2a-bc2044abe366',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'validator.js:validateSnake:preventDefault',message:'Testing preventDefault',data:{preventDefaultMatch,hasArrowKeys,hasPreventDefault,keydownSection:keydownSection.substring(0,200)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    tests.push({
      name: 'preventDefault pour les flèches',
      passed: preventDefaultMatch,
      message: preventDefaultMatch ? '' : 'Il faut ajouter e.preventDefault() pour les flèches (ArrowUp, ArrowDown, ArrowLeft, ArrowRight) afin d\'empêcher le scroll de la page'
    });

    const allPassed = tests.every(t => t.passed);
    return { allPassed, tests };
  }
}

// Instance globale
window.CodeValidator = CodeValidator;
